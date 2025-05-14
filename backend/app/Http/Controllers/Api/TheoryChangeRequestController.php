<?php

namespace App\Http\Controllers\Api;

use App\Models\TheoryChangeRequest;
use App\Models\ProgrammingTheory;
use App\Models\ProgrammingTopic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class TheoryChangeRequestController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'theory_id' => 'nullable|exists:programming_theory,id',
            'title' => 'required|string|max:255',
            'topic_id' => 'required|exists:programming_topics,id',
            'content' => 'required|string|min:10',
            'status' => 'required|string|in:NEW,UPDATE',  
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $status = $request->status;
        
        $changeRequest = TheoryChangeRequest::create([
            'topic_id' => $request->topic_id,
            'title' => $request->title,
            'theory_id' => $request->theory_id,
            'user_id' => Auth::id(),
            'content' => $request->content,
            'status' => $status,
            'is_approved' => false,
        ]);

        return response()->json([
            'message' => 'Change request submitted successfully',
            'data' => $changeRequest
        ], 201);
    }

    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $requests = TheoryChangeRequest::with('user')->get();

        return response()->json($requests);
    }

    public function reject($id)
    {
        $request = TheoryChangeRequest::findOrFail($id);

        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $request->delete();
        $user = $request->user;
        
        if ($user->rating - 1 >= 0) {
            $user->rating -= 1;
        }
        $user->save();

        return response()->json(['message' => 'Request rejected']);
    }

    public function approve($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $changeRequest = TheoryChangeRequest::findOrFail($id);
        $status = $changeRequest->status; 

        if ($status === 'UPDATE') {
            $theory = $changeRequest->theory;

            $relativePath = str_replace('storage/', '', $theory->filepath);
            Storage::disk('public')->put($relativePath, $changeRequest->content);

            $changeRequest->is_approved = true;
            $changeRequest->save();

            $user = $changeRequest->user;
            $user->rating += 1;
            $user->save();

            $changeRequest->delete();

            return response()->json(['message' => 'Change request approved and content updated']);
        }

        if ($status === 'NEW') {
       
            $topic = ProgrammingTopic::find($changeRequest->topic_id);

            $language = $topic->language->name ?? 'General';
            $topicName = preg_replace('/[^a-z0-9]+/i', '-', strtolower($topic->title));
            $fileName = preg_replace('/[^a-z0-9]+/i', '-', strtolower($changeRequest->title)) . '.md';
            $path = "Theory/{$language}/{$topicName}/{$fileName}";

            Storage::disk('public')->put($path, $changeRequest->content);

            $theory = ProgrammingTheory::create([
                'title' => $changeRequest->title,
                'theory_id' => $changeRequest->theory_id ?: null,
                'topic_id' => $topic->id,
                'filepath' => 'storage/' . $path,
                'language_id' => $topic->language_id,
            ]);

            $changeRequest->is_approved = true;
            $changeRequest->save();

            $user = $changeRequest->user;
            $user->rating += 1;
            $user->save();

            $changeRequest->delete();

            return response()->json(['message' => 'New theory created and change request approved']);
        }

        return response()->json(['error' => 'Invalid request status'], 400);
    }

}


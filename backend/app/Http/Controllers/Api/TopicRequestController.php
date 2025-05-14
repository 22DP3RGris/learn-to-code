<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChangeRequest;
use App\Models\ProgrammingTopic; 
use App\Models\ProgrammingLanguage;
use Illuminate\Support\Facades\Auth;

class TopicRequestController extends Controller
{
    public function store(Request $request, $languageName) 
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'difficulty' => 'required|in:beginner,intermediate,advanced,expert',
            'status' => 'required|in:NEW,UPDATE',
        ]);

        $language = ProgrammingLanguage::where('name', $languageName)->first();
        if (!$language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        $changeRequest = ChangeRequest::create([ 
            'language_id' => $language->id,
            'user_id' => Auth::id(),    
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'difficulty' => $validated['difficulty'],
        ]);

        return response()->json($changeRequest, 201);
    }

    public function index()
    {
        return ChangeRequest::with('user', 'language')
            ->whereIn('status', ['NEW', 'UPDATE'])
            ->get();
    }

    public function approve($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $topicRequest = ChangeRequest::findOrFail($id);

        $topic = ProgrammingTopic::create([
            'title' => $topicRequest->title,
            'description' => $topicRequest->description,
            'difficulty' => $topicRequest->difficulty,
            'language_id' => $topicRequest->language_id,
        ]);

        $user = $topicRequest->user;
        $user->rating += 1;
        $user->save();

        $topicRequest->delete();

        return response()->json(['message' => 'Topic change request approved and deleted']);
    }

    public function reject($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $topicRequest = ChangeRequest::findOrFail($id);

        $topicRequest->delete();

        $user = $topicRequest->user;
        if ($user->rating - 1 >= 0) {
            $user->rating -= 1;
        }
        $user->save();

        return response()->json(['message' => 'Topic change request rejected and user rating decreased']);
    }


}

<?php

namespace App\Http\Controllers\Api;

use App\Models\TheoryChangeRequest;
use App\Models\Theory;
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
            'theory_id' => 'required|exists:programming_theory,id', 
            'content' => 'required|string|min:10', 
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $changeRequest = TheoryChangeRequest::create([
            'theory_id' => $request->theory_id,
            'user_id' => Auth::id(),
            'content' => $request->content,
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

        $requests = TheoryChangeRequest::with(['theory.user', 'user'])->get();

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
}


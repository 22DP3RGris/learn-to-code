<?php

namespace App\Http\Controllers\Api;

use App\Models\ProgrammingTheory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class TheoryController extends Controller
{
    public function index($topicId, Request $request)
    {
        $perPage = $request->input('per_page', 1); 

        $theories = ProgrammingTheory::with(['user:id,username', 'topic:id,title'])
            ->where('topic_id', $topicId)
            ->orderBy('id')
            ->paginate($perPage);

        $theories->getCollection()->transform(function ($theory) {
            $relativePath = str_replace('storage/', '', $theory->filepath); 
            $markdown = Storage::disk('public')->get($relativePath);

            $theory->content = $markdown;

            return $theory;
        });

        return response()->json($theories);
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $theory = ProgrammingTheory::findOrFail($id);

        $relativePath = str_replace('storage/', '', $theory->filepath);

        Storage::disk('public')->put($relativePath, $request->input('content'));

        return response()->json(['message' => 'Teorija veiksmīgi saglabāta.']);
    }
}

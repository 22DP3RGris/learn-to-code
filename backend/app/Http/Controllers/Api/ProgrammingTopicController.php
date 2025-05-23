<?php

namespace App\Http\Controllers\Api;

use App\Models\ProgrammingLanguage;
use App\Models\ProgrammingTopic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProgrammingTopicController extends Controller
{
    public function index(Request $request, $language = null)
    {
        if ($language) {
            $language = ProgrammingLanguage::where('name', $language)->first();

            if (!$language) {
                return response()->json(['error' => 'Language not found'], 404);
            }

            $topics = ProgrammingTopic::where('language_id', $language->id)->get();
        } else {
            $topics = ProgrammingTopic::all();
        }

        return response()->json($topics);
    }

    public function store(Request $request, $language)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'difficulty' => 'required|in:beginner,intermediate,advanced,expert',
        ]);

        $topic = Topic::create([
            'title' => $request->title,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'language_id' => $language,
        ]);

        return response()->json($topic, 201);
    }
}

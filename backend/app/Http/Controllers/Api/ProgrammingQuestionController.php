<?php

namespace App\Http\Controllers\Api;

use App\Models\ProgrammingQuestion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProgrammingQuestionController extends Controller
{
    public function paginated($topicId)
    {
        return ProgrammingQuestion::with('answers')
            ->where('topic_id', $topicId)
            ->paginate(1); 
    }
}

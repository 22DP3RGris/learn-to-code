<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProgrammingQuestionSubmission;
use App\Models\ProgrammingAnswer;
use Illuminate\Support\Facades\Auth;

class ProgrammingAnswerController extends Controller
{
    public function submit(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'programming_question_id' => 'required|exists:programming_questions,id',
            'programming_answer_id' => 'required|exists:programming_answers,id',
        ]);

        $questionId = $request->programming_question_id;
        $answerId = $request->programming_answer_id;
        $answer = ProgrammingAnswer::findOrFail($answerId);
        $isCorrect = $answer->is_correct;

        $submission = ProgrammingQuestionSubmission::where('user_id', $user->id)
            ->where('programming_question_id', $questionId)
            ->first();

        if (!$submission) {
            ProgrammingQuestionSubmission::create([
                'user_id' => $user->id,
                'programming_question_id' => $questionId,
                'programming_answer_id' => $answerId,
                'is_correct' => $isCorrect,
            ]);

            if ($isCorrect) {
                $user->rating += 1;
                $user->save();
            }

            return response()->json([
                'correct' => $isCorrect,
                'message' => $isCorrect ? 'Correct!' : 'Incorrect. Try again.',
            ]);
        }

        $submission->programming_answer_id = $answerId;

        if ($isCorrect && !$submission->is_correct) {
            $submission->is_correct = true;
            $user->rating += 1;
            $user->save();
        }

        $submission->save();

        return response()->json([
            'correct' => $isCorrect,
            'message' => $isCorrect ? 'Correct!' : 'Incorrect. Try again.',
        ]);
    }

    public function getSubmissionStatus($questionId)
    {
        $user = Auth::user();
        
        $submission = ProgrammingQuestionSubmission::where('user_id', $user->id)
            ->where('programming_question_id', $questionId)
            ->first();
        
        if ($submission) {
            return response()->json([
                'is_answered' => true,
                'is_correct' => $submission->is_correct,
            ]);
        }

        return response()->json([
            'is_answered' => false,
            'is_correct' => false,
        ]);
    }
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgrammingQuestionSubmission extends Model
{
    protected $fillable = [
        'user_id',
        'programming_question_id',
        'programming_answer_id',
        'is_correct',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function question()
    {
        return $this->belongsTo(ProgrammingQuestion::class, 'programming_question_id');
    }

    public function answer()
    {
        return $this->belongsTo(ProgrammingAnswer::class, 'programming_answer_id');
    }
}

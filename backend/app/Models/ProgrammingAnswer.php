<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammingAnswer extends Model
{
    use HasFactory;

    protected $table = 'programming_answers';

    protected $fillable = [
        'question_id',
        'answer_text',
        'is_correct',
    ];

    public function question()
    {
        return $this->belongsTo(ProgrammingQuestion::class, 'question_id');
    }
}

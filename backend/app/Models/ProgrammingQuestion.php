<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammingQuestion extends Model
{
    use HasFactory;

    protected $table = 'programming_questions';

    protected $fillable = [
        'topic_id',
        'question',
    ];

    public function answers()
    {
        return $this->hasMany(ProgrammingAnswer::class, 'question_id');
    }

    public function topic()
    {
        return $this->belongsTo(ProgrammingTopic::class, 'topic_id');
    }
}
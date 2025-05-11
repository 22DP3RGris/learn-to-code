<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammingTheory extends Model
{
    use HasFactory;

    protected $table = 'programming_theory';

    protected $fillable = ['title', 'filepath', 'topic_id', 'language_id'];

    public function language()
    {
        return $this->belongsTo(ProgrammingLanguage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function topic()
    {
        return $this->belongsTo(ProgrammingTopic::class);
    }

    public function changeRequests()
    {
        return $this->hasMany(TheoryChangeRequest::class);
    }
}

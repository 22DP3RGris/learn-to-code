<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TheoryChangeRequest extends Model
{
    use HasFactory;

    protected $table = 'theory_change_requests';

    protected $fillable = [
        'user_id',
        'topic_id',
        'theory_id',
        'title',
        'content',
        'is_approved',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function language()
    {
        return $this->belongsTo(ProgrammingLanguage::class, 'language_id');
    }
}

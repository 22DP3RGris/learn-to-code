<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TheoryChangeRequest extends Model
{
    protected $fillable = [
        'theory_id',
        'user_id',
        'content',
        'is_approved',
    ];

    public function theory()
    {
        return $this->belongsTo(ProgrammingTheory::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

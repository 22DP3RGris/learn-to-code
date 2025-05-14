<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammingTopic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',         
        'description',     
        'difficulty',    
        'language_id',    
    ];

    public function language()
    {
        return $this->belongsTo(ProgrammingLanguage::class);
    }
}

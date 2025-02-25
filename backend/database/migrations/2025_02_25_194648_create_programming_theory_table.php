<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('programming_theory', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->longText('content');
            $table->foreignId('topic_id')->constrained('programming_topics')->onDelete('cascade');
            $table->foreignId('language_id')->constrained('programming_languages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theory');
    }
};

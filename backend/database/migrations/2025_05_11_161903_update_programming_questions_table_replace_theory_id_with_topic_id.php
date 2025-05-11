<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        // Schema::table('programming_questions', function (Blueprint $table) {

        //     if (Schema::hasColumn('programming_questions', 'theory_id')) {
        //         $table->dropForeign(['theory_id']);
        //         $table->dropColumn('theory_id');
        //     }

        //     if (!Schema::hasColumn('programming_questions', 'topic_id')) {
        //         $table->unsignedBigInteger('topic_id')->nullable();
        //     }

        //     $table->foreign('topic_id')->references('id')->on('topics')->onDelete('cascade');
        // });
    }

    public function down(): void
    {
        
    }
};

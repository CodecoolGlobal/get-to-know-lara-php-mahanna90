<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mails', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('id_user_from')->nullable();
            $table->foreign('id_user_from')->references('id')->on('users');

            $table->unsignedBigInteger('id_user_to')->nullable();
            $table->foreign('id_user_to')->references('id')->on('users');

            $table->string('subject');
            $table->text('message');
            $table->boolean('is_read')->default(0);
            $table->timestamp('sent')->default(\Illuminate\Support\Facades\DB::raw("CURRENT_TIMESTAMP") )->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mails');
    }
}

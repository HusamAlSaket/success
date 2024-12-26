<?php

// app/Models/Code.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'package_id', 'status'
    ];

    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id');
    }
}

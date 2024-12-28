<?php

// app/Models/Code.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;

    protected $primaryKey = 'code_id';
    protected $fillable = [
        'code',
        'subject',
        'year',
        'semester',
        'status',
        'package_id'
    ];

    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id');
    }
}

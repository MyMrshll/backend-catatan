
#  User Authentication API

Dokumentasi untuk endpoint `register` dan `login` pada aplikasi backend-catatan.

---

##  Endpoints  
- `POST /register`  
- `POST /login`

---

##  `POST /register`

### Deskripsi  
Mendaftarkan pengguna baru ke sistem. Data pengguna akan disimpan di file `users.json`.

### Request  
- **URL**: `/register`  
- **Method**: `POST`  
- **Headers**:  
  `Content-Type: application/json`

#### Body Parameters  
| Parameter | Tipe   | Deskripsi          |
|-----------|--------|--------------------|
| username  | String | Nama pengguna      |
| password  | String | Kata sandi         |
| email     | String | Alamat email unik  |

#### Contoh Request  
```json
{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com"
}
```

### Response  
#### Success (201)  
```json
{
  "message": "User registered successfully"
}
```

#### Error (500)  
```json
{
  "message": "Internal server error"
}
```

---

##  `POST /login`

### Deskripsi  
Login pengguna ke sistem dan mendapatkan token JWT jika berhasil.

### Request  
- **URL**: `/login`  
- **Method**: `POST`  
- **Headers**:  
  `Content-Type: application/json`

#### Body Parameters  
| Parameter | Tipe   | Deskripsi           |
|-----------|--------|---------------------|
| email     | String | Alamat email pengguna |
| password  | String | Kata sandi pengguna  |

#### Contoh Request  
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response  
#### Success (200)  
```json
{
  "message": "Login successful",
  "token": "<jwt_token>"
}
```

#### Error (401)  
```json
{
  "message": "Invalid email or password"
}
```

#### Error (500)  
```json
{
  "message": "Internal server error"
}
```
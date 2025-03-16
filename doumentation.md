
# 🙍‍♂️ User Authentication API

Dokumentasi untuk endpoint `register` dan `login` pada aplikasi backend-catatan.

---

## 🔗 Endpoints  
- `POST /api/register`  
- `POST /api/login`

---

##  `POST /register`

### Deskripsi  
Mendaftarkan pengguna baru ke sistem. Data pengguna akan disimpan di file `users.json`.

### Request  
- **URL**: `/api/register`  
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
  "email": "john@example.com",
  "password": "password123"
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
#### Bad Request (400)  
```json
{
  "message": "Invalid Format Email"
}
```
```json
{
  "message": "Password is not strong enough"
}
```
```json
{
  "message": "Email already exist"
}
```

---

##  `POST /api/login`

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




# 📚 Notes API Documentation

## 📌 Deskripsi
API sederhana untuk mengelola catatan (notes) milik user. Data disimpan dalam file JSON (`notes.json`).

---

## 📂 Endpoint List

| Method | Endpoint                   | Deskripsi                                                   |
|--------|----------------------------|-------------------------------------------------------------|
| GET    | `/api/notes`          | Mengambil semua catatan milik user tertentu                 |
| POST   | `/api/add/notes`          | Membuat catatan baru untuk user tertentu                    |
| PUT    | `/api/notes/:id`               | Memperbarui catatan berdasarkan ID catatan                  |
| DELETE | `api//notes/:id`               | Menghapus catatan berdasarkan ID catatan                    |

---

## ✅ Detail Endpoint

### NOTE :
- Semua endpoint CRUD membutuhkan token 

### 1. Get Notes by User ID

- **Endpoint:** `/api/notes`
- **Method:** `GET`
- **Deskripsi:** Mengambil semua notes milik user berdasarkan `id_user`.

#### Request
```
GET /notes
```

#### Response
```json
[
  {
    "id": 1,
    "id_user": "1",
    "title": "Judul Catatan",
    "body": "Isi Catatan"
  }
]
```

---

### 2. Create Note

- **Endpoint:** `/api/notes`
- **Method:** `POST`
- **Deskripsi:** Membuat note baru untuk user berdasarkan `id_user`.

#### Request
```
POST /add/notes
```

#### Body (JSON)
```json
{
  "title": "Judul Baru",
  "body": "Isi catatan baru"
}
```

#### Response
```json
{
  "message": "Note created successfully"
}
```

---

### 3. Update Note by Note ID

- **Endpoint:** `/api/update/notes/:id`
- **Method:** `PUT`
- **Deskripsi:** Memperbarui note berdasarkan `id`.

#### Request
```
PUT /notes/1
```

#### Body (JSON)
```json
{
  "title": "Judul Baru",
  "body": "Isi baru catatan"
}
```

#### Response  
```json
{
  "message": "Note updated successfully"
}
```
#### Not Found (404)  
```json
{
  "message": "Update note failed, data not found"
}
```
#### Forbidden (403)  
```json
{
  "message": "Forbidden: No access to this note"
}
```
---

### 4. Delete Note by Note ID

- **Endpoint:** `/api/delete/notes/:id`
- **Method:** `DELETE`
- **Deskripsi:** Menghapus note berdasarkan `id`.

#### Request
```
DELETE /api/notes/1
```

#### Response
```json
{
  "message": "Note deleted successfully"
}
```

#### Not Found (404)  
```json
{
  "message": "Delete note failed, data not found"
}
```
#### Forbidden (403)  
```json
{
  "message": "Forbidden: No access to this note"
}
```


---

## ⚠️ Error Handling
| Kode | Pesan                    |
|------|--------------------------|
| 404  | Note not found           |
| 500  | Internal server error    |
| 401  | Unauthorized   |

---

## ✍️ Author
- Marshall   


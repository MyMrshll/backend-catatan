
# 📚 Notes API Documentation

## 📌 Deskripsi
API sederhana untuk mengelola catatan (notes) milik user. Data disimpan dalam file JSON (`notes.json`).

---

## 📂 Endpoint List

| Method | Endpoint                   | Deskripsi                                                   |
|--------|----------------------------|-------------------------------------------------------------|
| GET    | `/notes/:id_user`          | Mengambil semua catatan milik user tertentu                 |
| POST   | `/notes/:id_user`          | Membuat catatan baru untuk user tertentu                    |
| PUT    | `/notes/:id`               | Memperbarui catatan berdasarkan ID catatan                  |
| DELETE | `/notes/:id`               | Menghapus catatan berdasarkan ID catatan                    |

---

## ✅ Detail Endpoint

### 1. Get Notes by User ID

- **Endpoint:** `/notes/:id_user`
- **Method:** `GET`
- **Deskripsi:** Mengambil semua notes milik user berdasarkan `id_user`.

#### Request
```
GET /notes/1
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

- **Endpoint:** `/notes/:id_user`
- **Method:** `POST`
- **Deskripsi:** Membuat note baru untuk user berdasarkan `id_user`.

#### Request
```
POST /notes/1
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

- **Endpoint:** `/notes/:id`
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

---

### 4. Delete Note by Note ID

- **Endpoint:** `/notes/:id`
- **Method:** `DELETE`
- **Deskripsi:** Menghapus note berdasarkan `id`.

#### Request
```
DELETE /notes/1
```

#### Response
```json
{
  "message": "Note deleted successfully"
}
```


---

## ⚠️ Error Handling
| Kode | Pesan                    |
|------|--------------------------|
| 404  | Note not found           |
| 500  | Internal server error    |

---

## ✍️ Author
- Shall   

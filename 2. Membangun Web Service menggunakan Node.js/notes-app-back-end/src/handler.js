import { nanoid } from 'nanoid';
import {notes} from './notes.js';

const addNoteHandler = (request, h)=>{
    //Data yang dibutuhkan
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    //Add data to notes:
    const newNote = {
        title, tags, body, id, createdAt, updateAt
    }
    console.log("ini data tambahan",newNote)
    notes.push(newNote)

    //cek data add or not
    const isSuccess = notes.filter((note)=>note.id===id)
    console.log("nilai is Success",isSuccess)
  
    if(isSuccess){
        const response = h.response({
            status : 'success',
            message: 'Catatan berhasil ditambahkan',
            data : {
                noteId : id,
            }
        })

        response.code(201);
        return(response);

    }
    const response = h.response({
        status : 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500)
    return(response)
    
}

const getAllNotesHandler = ()=>({
    status: 'success',
    data: {
      notes,
    },
})

const getNoteByIdHandler = (request, h) => {
    
    //Data yang dibutuhkan
    const { id }= request.params
    const note = notes.filter((note)=>note.id==id)[0]
    console.log("note", note)
    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editNoteByIdHandler = (request, h)=>{
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    //noteEdited = notes.filter((note)=>{note.id=={id}})[0]
    const index = notes.findIndex((note)=>note.id===id)
    

    if(index !== -1){
        console.log(notes[index])
        notes[index]={
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
          });
          response.code(200);
          return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
    response.code(404);
    return response;

}

const deleteNoteByIdHandler = (request, h)=>{
    const {id} = request.params
    const index = notes.findIndex((note)=>note.id==id)
    console.log("INI ADALAH NILAI INDEXNYA",index)


    if (index) {
        notes.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
}

export {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, 
    editNoteByIdHandler, deleteNoteByIdHandler}
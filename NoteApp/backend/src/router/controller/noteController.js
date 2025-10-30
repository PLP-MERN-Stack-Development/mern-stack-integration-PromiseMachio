import Note from "../model/Note.js"

export async  function getAllNotes(req,res){
    try{
        const notes = await Note.find({});
        res.status(200).json(notes)

    }catch(error){
        res.status(404).json({message:"Error when fetching notes.",error});

    }
  
};
export async function getOneNote(req,res){
    try {
        const notes = await Note.findById(req.params.id)
        if(!notes){
            res.staus(404).json({message:"Error while"})
        }
        res.json(notes)
    } catch (error) {
        res.status(500).json({message:"Internal error"})
        
    }

}

export async function createNotes(req,res){
    try{
        const {title, content} = req.body
        const Newnotes = Note({title, content});
        await Newnotes.save()
        res.status(201).json(Newnotes)
    }catch(error){
        res.status(400).json({message:"Error when updating notes",error})     
    }
  };

export async function updateNotes(req,res){
    try{
        const notes = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!notes) return res.status(404).json({message:"There's nothing to update"});
        res.status(201).json(notes)

    }catch(error){
    res.status(500).json({message:"Error when updating",error})
        
    }
  };

export async function deleteNotes(req,res){
    try{
        const {id} = req.params;
        const result = await Note.findByIdAndDelete(
            req.params.id
        );
        if(!result) return res.status(404).json({message:"Nothing to delete here"})
        res.status(200).json({message:"Note deleted succesfully"})
    }catch(error){
        console.log("Error message:",error.message);
        res.status(500).json({message:"Error when deleting "})
        
    }
};
import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence"

const TarefaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "To do"
    }
}, {
    timestamps: true  
})

export default mongoose.model("Tarefa", TarefaSchema);
const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }

   
}

const removeNote = (title) => {
    const notes = loadNotes()

    const filteredNotes = notes.filter((note) => note.title !== title)
    if (notes.length === filteredNotes.length) {
        console.log(chalk.bgRed('No note found!'))
    } else {
        console.log(chalk.bgGreen('Note removed!'))
    }

    saveNotes(filteredNotes)
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes...'))
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log('Title - ' + note.title)
        console.log('Body - ' + note.body)
    } else {
        console.log(chalk.bgRed('Note not found!'))
    }

    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
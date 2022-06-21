
import files from 'files'

const pathArchivos = 'C:/Users/heroe/Downloads/'

const texto = ["txt", "doc", "docx"]
const rootText = "C:/Users/heroe/Desktop/archivos/Texto/"

const imagen = ["jpg", "gif", "bmp", "png", "svg"]
const rootImagen = "C:/Users/heroe/Desktop/archivos/Imagenes/"

const vídeo = ["avi", "mp4", "mpeg", "mwv",]
const rootVideo = "C:/Users/heroe/Desktop/archivos/Videos"

const Ejecución = ["exe", "bat", "dll", "sys",]
const rootEjecución = "C:/Users/heroe/Desktop/archivos/Execucion/"

const audio = ["mp3", "wav", "wma",]
const rootAudio = "C:/Users/heroe/Desktop/archivos/Audio/"

const Comprimido = ["zip", "rar", "tar",]
const rootComprimido = "C:/Users/heroe/Desktop/archivos/ArchivoComprimidos/"

const lectura = ["pdf", "epub", "azw", "ibook"]
const rootLectura = "C:/Users/heroe/Desktop/archivos/Lectura/"

const iso = ["iso", "mds"]
const rootIso = "C:/Users/heroe/Desktop/archivos/ImgDisco/"


const moveArchive = async (archivo, nuevaRuta) => {
    const archivoSinRuta = archivo.split('\\')
    const nuevaUbicación = nuevaRuta + archivoSinRuta[archivoSinRuta.length - 1]
    console.log(nuevaUbicación)
    const movimiento = await files.move(archivo, nuevaUbicación)
    console.log("Archivo movido a:", movimiento)
}

const clasificador = async (tipos, tipoArchivo, archivo, nuevaRuta) => {

    await tipos.forEach(element => {
        if (element === tipoArchivo) {
            console.log("es:", element)
            moveArchive(archivo, nuevaRuta)
        }

    });
}
const clasificadorDirectorio = async (archivo, nuevaRuta) => {
    const archivoIsDirectory = await files.stat(archivo).isDirectory()
    if (archivoIsDirectory) {
        const archivoSplit = archivo.split('\\')
        await files.move(archivo, nuevaRuta + archivoSplit[archivoSplit.length - 1])
    }
}

const todos = async () => {
    const archivos = await files.list(pathArchivos)
    const archivos_extensiones = archivos.map(item => {
        return item.split(".")
    })
    await archivos_extensiones.forEach(async (item, index) => {
        const indexArray = item.length - 1
        await clasificador(texto, item[indexArray], archivos[index], rootText)
        await clasificador(imagen, item[indexArray], archivos[index], rootImagen)
        await clasificador(vídeo, item[indexArray], archivos[index], rootVideo)
        await clasificador(Ejecución, item[indexArray], archivos[index], rootEjecución)
        await clasificador(audio, item[indexArray], archivos[index], rootAudio)
        await clasificador(Comprimido, item[indexArray], archivos[index], rootComprimido)
        await clasificador(lectura, item[indexArray], archivos[index], rootLectura)
        await clasificador(iso, item[indexArray], archivos[index], rootIso)
        await clasificadorDirectorio(archivos[index], 'C:/Users/heroe/Desktop/archivos/miselaneos/')
    })
    console.log("terminado ")
}

todos()

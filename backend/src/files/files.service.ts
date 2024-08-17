import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as pth from 'path'
import * as fs from 'fs'

@Injectable()
export class FilesService {

    async createFile(file, id:number, postName: string){
        try{
            const fileName = id + postName + ".jpg";
            const filePath = pth.resolve(__dirname, "..", "imgs")
            fs.writeFileSync(pth.join(filePath, fileName), file.buffer)
            return fileName
        } catch (err){
            throw new HttpException("Ошибка при сохранении файла", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async deleteFile(id:number, postName: string) {
        try {
            const fileName = id + postName + ".jpg";
            const filePath = pth.resolve(__dirname, "..", "imgs", fileName)
            fs.unlinkSync(filePath)
        } catch (err) {
            throw new HttpException("Ошибка при удалении файла", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async renameFile(id:number, postName: string, newFileName: string) {
        try {
            const oldFileName = id + postName + ".jpg";
            const oldFilePath = pth.resolve(__dirname, "..", "imgs", oldFileName)
            const newFilePath = pth.resolve(__dirname, "..", "imgs", newFileName)
            fs.renameSync(oldFilePath, newFilePath)
            return newFileName
        } catch (err) {
            throw new HttpException("Ошибка при изменении названия файла", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

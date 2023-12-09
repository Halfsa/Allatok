import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import * as mysql from 'mysql2';
import { AppService } from './app.service';
import { UjAllatDTO } from './UjAllatDto';

const conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'allatok',
}).promise();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { title: 'Állatok főoldal' };
    }

  @Get('/allatform')
  @Render('allatform')
  ujAllat() {
    return { title: 'Állatform' };
  }

  @Post('/allatForm')
  async form(@Body() allat: UjAllatDTO) {
    const nev = allat.nev;
    const kor = allat.kor;
    const faj = allat.faj;
   const [ adatok ] = await conn.execute(
    'INSERT INTO allat (nev, eletkor, fajta) VALUES (?, ?, ?)',
    [nev, kor, faj],
    );

  }
  @Get('/allatok')
  @Render('allatok')
  async allatList(){
    const [adatok, mezok] = await conn.execute('select id, nev, fajta FROM allat');
    return { title: 'Állatok lista', allat: adatok };
  }
}

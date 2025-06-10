```

 __       ______   ________   ______    ___   __        _________  ______       ______   ______   ______   ______      
/_/\     /_____/\ /_______/\ /_____/\  /__/\ /__/\     /________/\/_____/\     /_____/\ /_____/\ /_____/\ /_____/\     
\:\ \    \::::_\/_\::: _  \ \\:::_ \ \ \::\_\\  \ \    \__.::.__\/\:::_ \ \    \:::__\/ \:::_ \ \\:::_ \ \\::::_\/_    
 \:\ \    \:\/___/\\::(_)  \ \\:(_) ) )_\:. `-\  \ \      \::\ \   \:\ \ \ \    \:\ \  __\:\ \ \ \\:\ \ \ \\:\/___/\   
  \:\ \____\::___\/_\:: __  \ \\: __ `\ \\:. _    \ \      \::\ \   \:\ \ \ \    \:\ \/_/\\:\ \ \ \\:\ \ \ \\::___\/_  
   \:\/___/\\:\____/\\:.\ \  \ \\ \ `\ \ \\. \`-\  \ \      \::\ \   \:\_\ \ \    \:\_\ \ \\:\_\ \ \\:\/.:| |\:\____/\ 
    \_____\/ \_____\/ \__\/\__\/ \_\/ \_\/ \__\/ \__\/       \__\/    \_____\/     \_____\/ \_____\/ \____/_/ \_____\/ 
                                                                                                                       

```

# Learn To Code

**Izglītošanas tīmekļa lietotne**

## Plāns

### Mērķis

Īstenot vienoto vietni programmēšanas teorētiskai/ praktiskai izglītošanai.

### Galvenās funkcionalitātes

- teorētisko zināšanu publicēšana, rediģēšana un apskatīšana;
- programmēšanas uzdevumu veidošana, risināšana;
- uzdevumu rezultātu automātiskā analīze un izvērtēšana;
- programmas koda apstrāde un palaišana;
- satura pilnveidošanas pieprasījumu apstrāde;
- statistikas apkopošana, izmantojot kārtošanu un filtrēšanu;
- reitinga punktu piešķiršana vai atņemšana.


## Izmantotās tehnoloģijas

### Back-end

- Laravel Framework v11.44.7
- MySQL v8.4.3
- RESTful API

### Front-end

- React 18.2.0
- CSS
- HTTP Client: Axios

## Programmas uzstādīšana

### Prasības
- Node.js v14+
- PHP v8.0+
- Composer
- MySQL

### Back-end palaišana
```bash
cd backend

composer install

# Izveido .env failu
cp .env.example .env # Jāiestata izmantojamā datubāze

php artisan key:generate

php artisan migrate --seed

php artisan serve
```

### Front-end palaišana
```bash
cd frontend

npm install

npm run dev
```

## Izstrādes stāvokļi

- [x] Lietotnes galvene ar navigāciju uz profilu reģistrētajiem lietotājiem (Header);
- [x] Lietotnes kājene (Footer);
- [x] Pielāgota lietotnes ritjosla (web scrollkit)
- [x] Reģistrēšanas/Ielogošanas/Izlogošanas iespēja gan frontend, gan backend, ierakstu saglabāšana MySQL datubāzē;
- [x] Datu validācija formās
- [x] Lietotāja profils
- [x] Sānu navigācijas iekļaušana projekta lapās (SideBar);
- [x] 404 NotFound lapa (Tiks uzlabots dizains);
- [x] Iesākta lomu sadalīšana viesim (1. Bilde) un reģistrētajam lietotājam (2. bilde) pamatojoties uz piešķirto access token;
- [x] Dizains tiek pārveidots par responsīvu telefoniem;
- [ ] Iesākts koda editors, pagaidām slikta drošība.
- [x] Galvenā lapa, vienlaikus jaunumu sadaļa (News);
- [x] Pirmā teorija sadaļa par Python pamatiem;
- [x] Teorētisko uzdevumu sadaļa par Python pamatiem;
- [ ] Praktisko uzdevumu sadaļa par Python pamatiem;
- [x] Izveidot skolotāja lomu, kam būs tiesības veidot uzdevumus un teoriju;
- [ ] Reitinga sadaļa;
- [ ] Atgriezeniskās saites veidošana.
- [ ] Iespēja veidot privātos uzdevumus.



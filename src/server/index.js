const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors')

app.use(cors())
app.use(express.json())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    pasword:'',
    database:'db_galeana'
})

app.post('/create',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const position =req.body.position ;
    const password =req.body.password ;
    const id_department =req.body.id_department;

    db.query('INSERT INTO users(name,email,position,password,id_department ) VALUES(?,?,?,?,?)',[name,email,position,password,id_department],
    (err, result)=>{
       if(err){
        console.log(err);
       }else{
        res.send('Usuario Registrado');
       }
        

    })
})
app.get('/us', (req,res)=>{
    db.query('SELECT * FROM users', (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    db.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al eliminar registro');
      } else {
        if (result.affectedRows > 0) {
          res.send('Registro eliminado exitosamente');
        } else {
          res.status(404).send('Registro no encontrado');
        }
      }
    })
  })
  app.put('/update',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const position=req.body.position;
    db.query('UPDATE users SET name=?, email=?, position=? WHERE id=?',[name,email,position,id], (err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send('Usuario Acutalizado')
      }
    })
  })
  

app.listen(3001,()=>{
    console.log('corrinedo en el puerto 3001');
})
/* departamentos codigo */
app.post('/createDepartment', (req, res) => {
  const name = req.body.name;

  db.query('INSERT INTO departments(name) VALUES(?)', [name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al registrar departamento');
    } else {
      res.send('Departamento registrado exitosamente');
    }
  });
});
app.get('/dep', (req,res)=>{
  db.query('SELECT * FROM departments', (err,result)=>{
    
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
  })
})
app.put('/updep',(req,res)=>{
  const id=req.body.id;
  const name=req.body.name;
  db.query('UPDATE departments SET name=? WHERE id=?',[name,id], (err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send('Departemanto Acutalizado')
    }
  })
})
app.delete('/deldep/:id', (req, res) => {
  const id = req.params.id;

  db.query(`DELETE FROM departments WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al eliminar registro');
    } else {
      if (result.affectedRows > 0) {
        res.send('Registro eliminado exitosamente');
      } else {
        res.status(404).send('Registro no encontrado');
      }
    }
  })
})
/* aqui inica el de activos */
app.post('/createac',(req,res)=>{
  const name =req.body.name;
  const description =req.body.description;
  const serie =req.body.serie;
  const location  =req.body.location;
  const condition_a =req.body.condition_a;

  db.query('INSERT INTO activos(name,description,serie,location,condition_a ) VALUES(?,?,?,?,?)',[name,description,serie,location,condition_a],
  (err, result)=>{
     if(err){
      console.log(err);
     }else{
      res.send('Usuario Registrado');
     }
      

  })
})
app.get('/ac', (req,res)=>{
  db.query('SELECT * FROM activos', (err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
  })
})
app.delete('/delac/:id', (req, res) => {
  const id = req.params.id;

  db.query(`DELETE FROM activos WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al eliminar registro');
    } else {
      if (result.affectedRows > 0) {
        res.send('Registro eliminado exitosamente');
      } else {
        res.status(404).send('Registro no encontrado');
      }
    }
  })
})
app.put('/upac',(req,res)=>{
  const id=req.body.id;
  const name=req.body.name;
  const description=req.body.description;
  const serie=req.body.serie;
  const condition_a=req.body.condition_a 
  db.query('UPDATE activos SET name=?, description=?, serie=?, location=?, condition_a=? WHERE id=?',[name,description,serie,location,condition_a,id], (err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send('Usuario Acutalizado')
    }
  })
})
app.get('/dep', (req, res) => {
  db.query('SELECT * FROM departments', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener departamentos');
    } else {
      res.send(result);
    }
  });
});

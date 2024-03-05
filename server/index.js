const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const salt =10;



app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET","PUT", "DELETE"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    pasword:'',
    database:'db_galeana'
})
const verifyUsers = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: 'No estás autenticado' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decode) => {
      if (err) {
        return res.json({ Error: 'El token no está bien' });
      } else {
        req.idu = decode.idu;
        req.name = decode.name;
        req.email = decode.email;
        req.position = decode.position;
        next();
      }
    });
  }
};

app.get('/', verifyUsers, (req, res) => {
  return res.json({
    Status: 'Success',
    idu: req.idu,
    name: req.name,
    email: req.email,
    position: req.position,

  });
});


/*app.post('/create',(req,res)=>{
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
})*/
app.post('/create', async (req, res) => {
  const { name, email, position, password, id_department } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    db.query(
      'INSERT INTO users (name, email, position, password, id_department) VALUES (?, ?, ?, ?, ?)',
      [name, email, position, hashedPassword, id_department],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al crear usuario');
        } else {
          res.send('Usuario registrado');
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
});

/*app.post('/login', (req, res)=>{
  const sql = 'SELECT * FROM users WHERE email =?';
  db.query(sql, [req.body.email], (err, data)=>{
    if(err) return res.json({Errr: "Login error in server"})
    if(data.length > 0){
      bcrypt.compare(req.body.password.toString(), data[0].password, (err,response)=>{
        if(err) return res.json({Errr: "passworsd compare error"});
        if(response){
          const id = data[0].id;
          const name = data[0].name;
          const email = data[0].email;
          const position = data[0].position;
          const token = jwt.sign({name, email, position, id}, "jwt-secret-key", {expiresIn: '1d'})
          res.cookie('token', token)
          return res.json({Status: "Success"})
        } else {
          return res.json({Error: "pasword not matched"})
        }
      })
    } else {
      return res.json({Errr: "Email not exist"})
    }
  })
})*/
app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE email =?';
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Errr: 'Login error in server' });
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if (err) return res.json({ Errr: 'password compare error' });
        if (response) {
          const idu = data[0].idu;
          const name = data[0].name;
          const email = data[0].email;
          const position = data[0].position;
          const token = jwt.sign({ idu, name, email, position }, 'jwt-secret-key', { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: 'Success' });
        } else {
          return res.json({ Error: 'Password not matched' });
        }
      });
    } else {
      return res.json({ Errr: 'Email not exist' });
    }
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
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
app.delete('/delete/:idu', (req, res) => {
    const id = req.params.idu;
  
    db.query(`DELETE FROM users WHERE idu = ?`, [id], (err, result) => {
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
    db.query('UPDATE users SET name=?, email=?, position=? WHERE idu=?',[name,email,position,idu], (err,result)=>{
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



app.post('/createac', async (req, res) => {
  const { name, description, serie, location, condition_a, id_users } = req.body;
  try {
    db.query(
      'INSERT INTO activos (name, description, serie, location, condition_a, id_users) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, serie, location, condition_a, id_users],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al crear activo');
        } else {
          res.send('Activo creado exitosamente');
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
});
app.put('/upac', async (req, res) => {
  const { id, name, description, serie, location, condition_a } = req.body;

  try {
    db.query(
      'UPDATE activos SET name=?, description=?, serie=?, location=?, condition_a=? WHERE id=?',
      [name, description, serie, location, condition_a, id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al actualizar activo');
        } else {
          if (result.affectedRows > 0) {
            res.send('Activo actualizado exitosamente');
          } else {
            res.status(404).send('Activo no encontrado');
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
});
app.delete('/delac/:id', async (req, res) => {
  const id = req.params.id;

  try {
    db.query(`DELETE FROM activos WHERE id = ?`, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al eliminar activo');
      } else {
        if (result.affectedRows > 0) {
          res.send('Activo eliminado exitosamente');
        } else {
          res.status(404).send('Activo no encontrado');
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
});
app.get('/ac', (req,res)=>{
  db.query('SELECT * FROM activos', (err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
  })
})

import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
function App() {


  const fullNameRef = useRef('Gheorghe')
  const [userName, setUserName] = useState('Gio')
  const [password, setPassword] = useState('Ciao123@')
  const specializationRef = useRef()
  const yearsExperienceRef = useRef()
  const [description, setDescription] = useState('Ciao sono giosdsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')

  // con regex.test(stringa) verifico se una parola contiene carratteri speciali
  const regex = /[^a-zA-Z0-9]/;

  const isValidUsername = useMemo(() => {
    const validChar = !regex.test(userName)
    const validLength = userName.trim().length >= 6
    return { validChar, validLength }
  }, [userName])

  const isValidPassword = useMemo(() => {
    // Verifico se la password contiene una maiuscola
    const containMaiusc = /(?=.*[A-Z])/.test(password)
    // Verifico se la password contiene un numero
    const containNumber = /(?=.*\d)/.test(password)
    // Verifico se la password contiene un carattere speciale 
    const containSpecial = /(?=.*[^a-zA-Z0-9])/.test(password)
    // Verifico se la password e maggiore o uguale a 8
    const isPasswordLength = password.trim().length >= 8
    return { containMaiusc, containNumber, containSpecial, isPasswordLength }
  }, [password])

  const isValidDescription = useMemo(() => {
    // verifico che la lunghezza della descrizione sia compresa tra 100 e 1000 caratteri
    const isDescriptionLength = description.trim().length >= 100 && description.trim().length <= 1000
    return isDescriptionLength
  }, [description])

  const handleSubmit = (e) => {
    e.preventDefault()

    // prendo il valore fullNameRef
    const fullName = fullNameRef.current.value
    // prendo il valore specializationRef
    const specialization = specializationRef.current.value
    // prendo il valore di yearsExperienceRef
    const yearsExperience = yearsExperienceRef.current.value

    // se i campi non sono stati compilati blocco il submit
    if (!fullName.trim() || !userName.trim() || !password.trim() || !specialization.trim() || !description.trim() || !yearsExperience.trim() || yearsExperience <= 0) return;

    // Se lo username contiene carratteri speciali blocco il submit
    if (!isValidUsername.validChar || !isValidUsername.validLength) return

    // Se la password non soddisfa le condizioni allora blocco il submit
    if (!isValidPassword.containMaiusc || !isValidPassword.containNumber || !isValidPassword.containSpecial) return

    // Se la descrizione non rispetta la lunghezza allora blocco il submit
    if (!isValidDescription) return


    console.log(
      `
      - nome completo: ${fullName},
      - nome utente: ${userName},
      - password: ${password},
      - specializazione: ${specialization},
      - Anni di esperienza: ${yearsExperience},
      - descrizione: ${description}.
      `
    );
  }

  // utilizzo useEffect per far partire il focus sul campo nome completo una volta che il componente è montato
  useEffect(() => {
    fullNameRef.current.focus()
  }, [])

  // reset dei campi del form 
  const resetForm = () => {
    setDescription('')
    setPassword('')
    setUserName('')
    fullNameRef.current.value = ''
    specializationRef.current.value = ''
    yearsExperienceRef.current.value = ''
  }

  // creo una ref per scrollare alla sezione del form
  const sectionRef = useRef()
  // creo la funzione per scrollare alla sezione del form
  const autoScroll = () => {
    // utilizzo .scrollIntoView per scrollare alla sezione del form mettendo come parametro behavior: "smooth" per avere un effetto di scroll fluido
    sectionRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <div>
        <h2>Per registrarti compila i seguenti campi</h2>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div ref={sectionRef}>
            <label htmlFor="fullName">Inserisci il tuo nome completo</label> <br />
            <input
              id='fullName'
              type="text"
              ref={fullNameRef}
              placeholder="Nome e cognome"
              required
            />
          </div>

          <div>
            <label htmlFor="username">Inserisci un username</label> <br />
            <input
              id='username'
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Nome utente"
              required
            /> <br />
            {!isValidUsername.validChar ? <span className='red'>Lo username contiene caratteri speciali!</span> :
              !isValidUsername.validLength ? <span className='red'> Lo username deve contenere almeno 6 caratteri ({userName.length})</span> :
                <span className='green'>Username valido</span>}
          </div>

          <div>
            <label htmlFor="password">Inserisci una password</label> <br />
            <input
              id='password'
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            /> <br />
            <span className={isValidPassword.containMaiusc && isValidPassword.containNumber && isValidPassword.containSpecial ? 'green' : 'red'}>
              {
                !isValidPassword.isPasswordLength ? 'Password troppo corda, almeno 8 caratteri.' :
                  !isValidPassword.containMaiusc ? 'Inserisci almeno una maiuscola' :
                    !isValidPassword.containNumber ? 'Inserisci almeno un numero' :
                      !isValidPassword.containSpecial ? 'Inserisci almeno un carattere speciale' :
                        isValidPassword.containMaiusc && isValidPassword.containNumber && isValidPassword.containSpecial && 'Password valida'
              }
            </span>
          </div>

          <div>
            <label htmlFor="specialization">Seleziona una delle opzioni</label> <br />
            <select
              id="specialization"
              name='specialization'
              ref={specializationRef}
              required
            >
              <option value="">-- Seleziona la tua specializzazione --</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Inserisci i tuoi anni di esperienza</label> <br />
            <input
              type="number"
              ref={yearsExperienceRef}
              placeholder="inserisci i tuoi anni di esperienza"
              required
            />
          </div>

          <div>
            <label htmlFor="">Breve descrizione su di te</label> <br />
            <textarea name="" id=""
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            /> <br />
            <span className={!isValidDescription ? 'red' : 'green'}>
              {!isValidDescription ? `${description.length} caratteri. La descrizione deve comprendere tra 100 e 1000 caratteri` : `${description.length} caratteri.`}
            </span>
          </div>
          <button>Invia</button>
        </form>
        <div className='container-buttons'>
          <button onClick={() => resetForm()}>Reset</button>
          <button onClick={autoScroll}>torna su</button>
        </div>
      </div>
    </>
  )
}

export default App

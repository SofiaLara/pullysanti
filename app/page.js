"use client"
import React, { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library'
import dynamic from 'next/dynamic'
import Donde from './components/Donde';
import Hero from './components/Hero';

// Config variables
NEXT_PUBLIC_SPREADSHEET_ID = "1AE9RRaedofgzn6ycw2mMrkZSDqe49z_LqIbGzkyvjuE"
NEXT_PUBLIC_SHEET_ID = 0
NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL = "weddingconfirmation@wedding-390813.iam.gserviceaccount.com"
GOOGLE_SERVICE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCamNvV6rf7vx4k\nVL1xXecizA10Kvk21XfKiLyxa/9nHUTTdRrvNtI50NPyPOhxgwn/g1MXHlGUkSui\nWxhZgGHJHjGMU25/TolIZWnXsr/GvRF++j0NJYwPnHF5rlCL9YnKm+0k3TmIzxeH\nszqzHs5TsWsUInmVSbbXCT8PXQlzJ+Mto2Ahwe6L33CAlquQAlhuAGZJTpZ59gYB\nbo1ff8HJMLjxrGEUV7ifLk0qWbLjOlsxTvWubYKen7yHylyZpMZ9YROl3Gm5BdKk\nV03fVK9kTjbvaTOzL5Y7qv0a+MskRiUBW0P9F38Dmkg5fIpyDTCmdcmxwDavr7ms\nZR2uYTXrAgMBAAECggEACnAxv7LWc1gHJ/rUw7fMaGwQqHxSUWJ+cR1kaDJbj1HJ\nmOF6TRaNgTvZY6y7IRbw8OCkFpaEeZyHrrGp5jkl4Rd5zvi/KDdcS5gVWmwGSNvx\nN3qb7qxPVaqBeu7LH3gXsqdujqOlQ9h/xTjTyM5Wrg33pediADN29fP43wewIKdA\n44rZRNqV4vGB3I6W3r+kVEB2+Rkgva72tkdYUL/aybYHPJkmei/P8yLCXPlV+Fqd\nXJpgG79OgDE9avKlvU9+oR3IBsCIxPvLdp9TIaUKCk/NordzSWSLEubn6D0djiVx\noScHp+rxEXpfNJ+CLn4byEqAUOPauTShZ+XNNRmMwQKBgQDT3D0N5eUTBox3UoKL\nHDMiefa1e5ySKeQsyUICbUuLmCpyvAgtOtDb9C13OLYamrCFt0JQIc6WAAOC/2JR\nuWaQgD/7Ye2cLZjsGcXOVyQtvlwFJSzWHB2KDJzIGHgWCf6Cq/2/f4A3QdK2QFk3\nBKpqn69CkvMMPWHwRTJpxH/H4QKBgQC6zm95EgsY31Id6bpfNBVhz+Q/Jb3xoxsj\n1f51EnnkwmuFLOIZ2qrH5tcYQk2+e/5somNimyz/RvpRAqVxVhOEzqZDrqOt7Ue7\npeMkpYLZgb00P2IkusaUhJBFmvHDqp+VdKAs5210DFOmoIYI2sTvMdwSaHBGrON5\npqaiY8qHSwKBgGH9M6AB/PnXxZBK8WY2HNCNaLZ3/er8xTSRwZ4tvwtJzhhTL9T7\npy6UuZKzAEc91PeD04AMouhuCTHFvUvfXLjpGK7ElInv7RMGuJ6/X1Ro/1bB4wME\n7gSz4LAL4T8QUE9QDYVNC5iDMVpqWNlBpzC5uu4n2ZKHsYzX9IFHCXMBAoGAIhLZ\nfmnuIEFLxy0E06y6Ybb72RDXTqYDo0u7ODuAhFt6JTaEn1alZAUVItWlPKN9Su9r\n1WaclIuryO8EomGi+cx/w0StkmH/fZjKj7qo3WeuzULqceynoBt1/Vw/0QLkTOyS\n8t3btxkwgOoyyJau6Tpc+/aU1C9g5qWhK2msXXUCgYEAvC4GkvrDMXokV+ykBypR\ndNahirGI8cA3KKlH3B2yeXjdHcHbPM8I+AaslPWLJHuwmpmCAsIgjfMIgJxUYH6V\nqJdIuhMCXa91ul21gX4AJF0k4FLxg0bgCSm1jCd5e01oX+xvnZpKYk8uX+Wu5xe7\ndNr1Qn/vI90XepLf14vEDjw=\n-----END PRIVATE KEY-----\n"

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL || NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n') || GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n');

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [form, setForm] = useState({
    name: '',
    asistencia: '',
    restriccion: '',
    plusone: '',
    nameplusone: '',
    restriccionplusone: '',
    bus: '',
    mensaje: '',
  })
  const [asist, setAsist] = useState(false)
  const [plusone, setPlusOne] = useState(false)
  const [success, setSuccess] = useState(false)
  // To fix hydration error, we import the component dynamicly because
  // it uses logic that comes from third party library and cannot be modified.
  // Otherwise, we use useEffect. https://stackoverflow.com/questions/66374123/warning-text-content-did-not-match-server-im-out-client-im-in-div
  const Countdown = dynamic(
    () => import('./components/Countdown'),
    { ssr: false }
  )

  // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_SERVICE_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

  const appendSpreadsheet = async (row) => {
    // setLoading(true);
    // await doc.useServiceAccountAuth({
    //       client_email: GOOGLE_CLIENT_EMAIL,
    //       private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    // });
    await doc.loadInfo();
    //Write data in the sheet 
    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow(row);
    console.log(row, 'here')
    setLoading(false)
    setSuccess(true)

    // return new Promise( async function(resolve,reject){
    //   try {
    //     var jsonObj = {}
    //     console.log(doc, 'docc')
    //     doc.useServiceAccountAuth({
    //       client_email: GOOGLE_CLIENT_EMAIL,
    //       private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    //     });
    //     // loads document properties and worksheets
    //     await doc.loadInfo();
    //     console.log(jsonObj, 'json');  
    //     resolve(jsonObj);
  
    //     const sheet = doc.sheetsById[SHEET_ID];
    //     await sheet.addRow(row);
    //     setLoading(false);
    //     setAlert(true);
    //     setForm({
    //       name: '',
    //       email: '',
    //       topic: '',
    //       description: '',
    //     });
    //   } catch (e) {
    //     console.error('Error: ', e);
    //     setLoading(false);
    //     reject();
    //   }
    // }); // end of promise

  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      form.name !== '' &&
      form.asistencia !== '' &&
      form.plusone !== ''
    ) {
      const newRow = {
        Name: form.name,
        Asistencia: form.asistencia,
        Restriccion: form.restriccion,
        Acompanante: form.plusone,
        NombreAcompanante: form.nameplusone,
        RestriccionAcompanante: form.restriccionplusone,
        Bus: form.bus,
        Mensaje: form.mensaje,
        Date: new Date(),
      };
      appendSpreadsheet(newRow);
      //accessSpreadsheet()
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [alert]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAsist = (e) => {
    console.log(e.target.value,'asist')
    setAsist(e.target.value)
  }

  const handlePlusOne = (e) => {
    console.log(e.target.value,'plus one')
    setPlusOne(e.target.value)
  }

  console.log(asist,'asist')

  return (
    <div className='bg-color'>
      <div className='flex justify-center items-center min-h-screen relative' id='section-intro'>
        <Hero/>
      </div>
      <div className='flex flex-col justify-center item-center py-10' id="section-countdown">
        <Countdown/>
      </div>
      <hr/>
      <div className='flex flex-col justify-center item-center p-10' id="section-donde">
        <h2 className='text-2xl self-center py-3'>Donde & Cuando?</h2>
        <Donde/>
      </div>
      <hr/>
      <div className="flex flex-col justify-center items-center" id='section-rsvp'>
          <form
            className="space-y-3 w-full max-w-lg mx-auto p-5 relative pt-10"
            onSubmit={submitForm}
          >
            {alert && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-center">
                <strong className="font-bold mr-1">Success!</strong>
              </div>
            )}
            <h2 className='text-2xl self-center py-3'>RSVP</h2>
            <label className="block">
              <span className="block text-gray-700 font-semibold">Nombre y Apellido</span>
              <input
                name="name"
                type="text"
                className="form-input form-field-contact"
                onChange={handleChange}
                value={form.name} />
            </label>
            <label className="block">
              <span className="block text-gray-700 font-semibold">Confirmas asistencia?</span>
              <label> No
              <input
                name="asistencia"
                type="radio"
                className="form-input form-field-contact"
                onChange={(e) => {
                  handleChange(e), 
                  handleAsist(e)
                }}
                value={false} />
              </label>
             <label className="block"> Si
              <input
                name="asistencia"
                type="radio"
                className="form-input form-field-contact"
                onChange={(e) => {
                  handleChange(e), 
                  handleAsist(e)
                }}
                value={true} />  
              </label>
            </label>
            {asist === 'true' && (
              <>
              <span className="block"> Tenes alguna restriccion alimentaria? </span>
              <label> No
              <input
                name="restriccion"
                type="radio"
                className="form-input form-field-contact"
                onChange={handleChange}
                value={'No'} />
            </label><label className="block"> Vegetariano
                <input
                  name="restriccion"
                  type="radio"
                  className="form-input form-field-contact"
                  onChange={handleChange}
                  value={'Vegeta'} />
              </label>
              <label className="block"> Celiaco
                <input
                  name="restriccion"
                  type="radio"
                  className="form-input form-field-contact"
                  onChange={handleChange}
                  value={'Celiaco'} />
              </label>
                <span className="block text-gray-700 font-semibold">Venis acompañado?</span>
                <label> No
              <input
                name="plusone"
                type="radio"
                className="form-input form-field-contact"
                onChange={(e) => {
                  handleChange(e), 
                  handlePlusOne(e)
                }}
                value={false} />
              </label>
             <label className="block"> Si
              <input
                name="plusone"
                type="radio"
                className="form-input form-field-contact"
                onChange={(e) => {
                  handleChange(e), 
                  handlePlusOne(e)
                }}
                value={true} />  
              </label>
              {plusone === 'true' && (
              <><label className="block">
                  <span className="block text-gray-700 font-semibold">Nombre y apellido del acompañante</span>
                  <input
                    name="nameplusone"
                    type="text"
                    className="form-input form-field-contact"
                    placeholder="Nombre completo"
                    onChange={handleChange}
                    value={form.nameplusone} />
                </label><label className="block">
                    <span className="block text-gray-700 font-semibold">Alguna restriccion alimentaria para tu acompañante?</span>
                  </label><label> No
                    <input
                      name="restriccionplusone"
                      type="radio"
                      className="form-input form-field-contact"
                      onChange={handleChange}
                      value={'No'} />
                  </label><label className="block"> Vegetariano
                    <input
                      name="restriccionplusone"
                      type="radio"
                      className="form-input form-field-contact"
                      onChange={handleChange}
                      value={'Vegeta'} />
                  </label><label className="block"> Celiaco
                    <input
                      name="restriccionplusone"
                      type="radio"
                      className="form-input form-field-contact"
                      onChange={handleChange}
                      value={'Celiaco'} />
                  </label></>
              )}
              <label className="block">
                <span className="block text-gray-700 font-semibold">Necesitas transporte de bus?</span>
                <label> No
              <input
                name="bus"
                type="radio"
                className="form-input form-field-contact"
                onChange={handleChange}
                value={'No gracias'} />
              </label>
             <label className="block"> Si
              <input
                name="bus"
                type="radio"
                className="form-input form-field-contact"
                onChange={handleChange}
                value={'Si por favor'} />  
              </label>
              </label><label className="block">
                <span className="block text-gray-700 font-semibold">Mensaje</span>
                <textarea
                  name="mensaje"
                  className="form-textarea form-field-contact resize-none"
                  rows="3"
                  placeholder="Dejanos tu mensaje"
                  onChange={handleChange}
                  value={form.mensaje} />
              </label></>
            )}
            <button
              className="bg-green-200 px-3 py-1 font-semibold shadow-md rounded-md w-40 border-2 border-green-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading || success}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="animate-spin">
                  </div>
                  <p>Sending</p>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <p>{success ? 'Gracias!': 'Mandar'}</p>
                </div>
              )}
            </button>
          </form>
      </div>
      <hr/>
      <div className='flex flex-col justify-center item-center p-10' id="section-dress">
        <h2 className='text-2xl self-center py-3'>Dress Code</h2>
        <p>Formal</p>
      </div>
      <hr/>
      <div className='flex flex-col justify-center item-center p-10' id="section-dress">
        <h2 className='text-2xl self-center py-3'>Luna de Miel</h2>
        <p>Contribucion pop up</p>
      </div>
    </div>
  );
};

export default ContactForm;
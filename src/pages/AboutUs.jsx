import userAvatarDefault from '../assets/images/user-male-avatar.png'

export const AboutUs = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Título Principal */}
      <h1 className='text-4xl font-bold text-center mb-12'>Sobre Nosotros</h1>

      {/* Sección 1: Historia */}
      <div className='flex flex-col md:flex-row items-center mb-12'>
        <div className='md:w-1/2 p-4'>
          <img
            src='https://concepto.de/wp-content/uploads/2024/05/valores-de-una-empresa.jpg'
            alt='Historia'
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>
        <div className='md:w-1/2 p-4'>
          <h2 className='text-2xl font-semibold mb-4'>Historia</h2>
          <p className='text-lg text-gray-700'>
            TrustCode nació del deseo de un grupo de apasionados
            desarrolladores de software quienes compartían una visión común:
            crear soluciones tecnológicas que generen un impacto positivo en
            la vida de las personas. Con una combinación de talento,
            experiencia y creatividad, TrustCode fue fundada con el objetivo
            de ofrecer servicios de desarrollo de software de alta calidad,
            enfocados en la satisfacción del cliente y la innovación
            constante.
          </p>
        </div>
      </div>

      {/* Sección 2: Misión */}
      <div className='flex flex-col md:flex-row-reverse items-center mb-12'>
        <div className='md:w-1/2 p-4'>
          <img
            src='https://concepto.de/wp-content/uploads/2024/05/valores-de-una-empresa.jpg'
            alt='Misión'
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>
        <div className='md:w-1/2 p-4'>
          <h2 className='text-2xl font-semibold mb-4'>Misión</h2>
          <p className='text-lg text-gray-700'>
            Nuestra misión en TrustCode es ofrecer soluciones tecnológicas
            innovadoras y personalizadas que impulsen el éxito de nuestros
            clientes. Nos comprometemos a desarrollar software de alta
            calidad, alineado con las necesidades específicas de cada
            proyecto, y a construir relaciones de confianza basadas en la
            transparencia, el profesionalismo y la excelencia.
          </p>
        </div>
      </div>

      {/* Sección 3: Visión */}
      <div className='flex flex-col md:flex-row items-center mb-12'>
        <div className='md:w-1/2 p-4'>
          <img
            src='https://concepto.de/wp-content/uploads/2024/05/valores-de-una-empresa.jpg'
            alt='Visión'
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>
        <div className='md:w-1/2 p-4'>
          <h2 className='text-2xl font-semibold mb-4'>Visión</h2>
          <p className='text-lg text-gray-700'>
            En TrustCode, aspiramos a ser reconocidos como un referente en la
            industria del desarrollo de software, destacándonos por nuestra
            capacidad para transformar ideas en soluciones tecnológicas
            efectivas. Nuestro objetivo es crecer junto con nuestros clientes,
            liderando el camino hacia un futuro digital donde la tecnología
            sea accesible y beneficiosa para todos.
          </p>
        </div>
      </div>

      {/* Sección 4: Valores */}
      <div className='flex flex-col md:flex-row-reverse items-center mb-12'>
        <div className='md:w-1/2 p-4'>
          <img
            src='https://concepto.de/wp-content/uploads/2024/05/valores-de-una-empresa.jpg'
            alt='Valores'
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>
        <div className='md:w-1/2 p-4'>
          <h2 className='text-2xl font-semibold mb-4'>Objetivo</h2>
          <p className='text-lg text-gray-700'>
            Nuestro principal objetivo es proporcionar a nuestros clientes un
            servicio integral que cubra todas sus necesidades tecnológicas,
            desde la conceptualización de la idea hasta la implementación
            final y el soporte continuo. Queremos ayudar a las empresas a
            evolucionar en el entorno digital, optimizando sus procesos y
            potenciando su crecimiento.
          </p>
        </div>
      </div>

      {/* Sección del equipo */}
      <div className='bg-gray-100 p-8 rounded-lg shadow-lg mt-12'>
        <h2 className='text-3xl font-semibold text-center mb-8'>Integrantes</h2>
        <div className='flex flex-wrap justify-center gap-8'>
          <div className='text-center'>
            <img
              src={userAvatarDefault}
              alt='Fernando Tello'
              className='w-24 h-24 rounded-full mx-auto mb-4 shadow-lg'
            />
            <h3 className='text-xl font-semibold'>Fernando Tello</h3>
            <p className='text-gray-600'>Frontend Developer</p>
          </div>
          <div className='text-center'>
            <img
              src={userAvatarDefault}
              alt='Piero Becerra'
              className='w-24 h-24 rounded-full mx-auto mb-4 shadow-lg'
            />
            <h3 className='text-xl font-semibold'>Piero Becerra</h3>
            <p className='text-gray-600'>Backend Developer</p>
          </div>
          <div className='text-center'>
            <img
              src={userAvatarDefault}
              alt='Ricardo Bueno'
              className='w-24 h-24 rounded-full mx-auto mb-4 shadow-lg'
            />
            <h3 className='text-xl font-semibold'>Ricardo Bueno</h3>
            <p className='text-gray-600'>Backend Developer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

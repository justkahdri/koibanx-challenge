![KOIBANX](https://static.wixstatic.com/media/8974d4_1a120064e09245c09fec8d379f4e3b3c~mv2.png/v1/fill/w_360,h_70,al_c,q_85,usm_0.66_1.00_0.01/Productos_KOIBANX-05.webp)

# CHALLENGE FRONTEND

## EJECUCI&Oacute;N

Se instalan las dependencias con `npm i` y se corre el modo desarrollo con `npm start`.

## ACLARACIONES

- ### Impresi&oacute;n por consola

  Al realizar la b&uacute;squeda en modo desarrollo, ya sea con el &iacute;cono de la lupa o presionando la tecla ENTER, se imprimira en consola la URL que se utilizar&iacute;a en producci&oacute;n.

- ### Uso de Dummy

  Para el display de la respuesta de la API utilice un .json creado con [Mockaroo](https://www.mockaroo.com/), el cual cuenta con 20 entradas con campos similares a los que se recibir&aacute;n de la API real.

- ### IDs repetidos

  Por lo mencionado anteriormente, los IDs generados por el template cuentan con 24 caracteres, por lo que decid&iacute; recortarlos en la exhibici&oacute;n de la tabla y dar un mejor resultado visual. Al muchos IDs compartir algunos caracteres, en la tabla parecieran ser los mismos.

- ### Validaci&oacute;n de la b&uacute;squeda

  Consider&eacute; una validaci&oacute;n b&aacute;sica para el input de b&uacute;squeda con un m&iacute;nimo de dos caracteres y diferenciando may&uacute;sculas de min&uacute;sculas. Adem&aacute;s, muestra un error cuando no hay ning&uacute;n filtro seleccionado.

- ### Reemplazo del Dummy

  Dentro de la funci&oacute;n 'getData' existe una validaci&oacute;n que reconoce si el modo en el que se est&aacute; trabajando es producci&oacute;n o desarrollo. Mediante esta validaci&oacute;n autom&aacute;ticamente se reemplaza el dummy por una solicitud a la API con los query params indicados.

## TECNOLOG&Iacute;AS

App creada a partir del template con TypeSript de [Vite](https://vitejs.dev/).
Utilic&eacute; &uacute;nicamente React con TypeScript y [ChakraUI](https://chakra-ui.com/) para los estilos, exceptuando la tabla que est&aacute; realizada con CSS "vanilla".



window.onload = (() => {

  const attributeName = 'aria-label'
  const selectedClassName = 'webtalklib_selected'
  var currentSelected = null


  // documentation of speech recognition in https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  const systemCommands = ['clicca', 'esci']
  var commands = []

  document.querySelectorAll("[" + attributeName + "]").forEach(c => {
    console.log(c)
    commands.push(c.getAttribute(attributeName))
  })
  const systemCommandsGrammar = `#JSGF V1.0; grammar syscommands; public <syscommand> = ${systemCommands.join(
    " | ",
  )};`

  const commandsGrammar = `#JSGF V1.0; grammar commands; public <command> = ${commands.join(
    " | ",
  )};`

  speechRecognitionList.addFromString(commandsGrammar)


  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "it-IT";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;


  document.body.onclick = () => {
    if (recognition && !recognition.started) {
      console.log(recognition)
      recognition.start();
      recognition.started = true
      console.log("Ready to receive a color command.");
    }
  };


  recognition.onresult = (event) => {

    console.log(event.results)

    const command = event.results[0][0].transcript;
    console.log(`Result received: ${command}.`);

    console.log(`Confidence: ${event.results[0][0].confidence}`);
    onCommand(command)
  };


  recognition.onspeechend = () => {
    recognition.stop();
    recognition.started = false
  };

  recognition.onnomatch = (event) => {
    console.log("I didn't recognize the command.");
  };

  function find(values, parentElement) {

    var querySelector = getQuerySelector(attributeName, values)

    // console.log(querySelector)

    var element = parentElement.querySelectorAll(querySelector)

    if (element && element.length > 0) {

      removeSelection()

      element = element[0]
      element.classList.add(selectedClassName)
      if (element.focus) {
        element.click()
      }
      return element

    } else if (parentElement != document) {
      return find(values, document)
    }
  }

  function getQuerySelector(attributeName, values) {

    if (values instanceof Array) {
      var selectors = values.map(v => "[" + attributeName + "=" + v + "]")
      return selectors.join(",")
    }

    return "[" + attributeName + "=" + values + "]"
  }

  function removeSelection() {
    currentSelected = null
    document.querySelectorAll("." + selectedClassName).forEach(el => el.classList.remove(selectedClassName))
  }


  function onCommand(commandName) {

    if (commandName) {

      switch (commandName.toLowerCase()) {
        case systemCommands[1]:  //esci 
          removeSelection()
          break;
        case systemCommands[0]: //clicca
          currentSelected && currentSelected.click && currentSelected.click()
          break;

        default:

          if (currentSelected) {

            if (currentSelected instanceof HTMLInputElement && currentSelected.value != undefined) {
              currentSelected.value = commandName
              return
            } else if (currentSelected instanceof HTMLTextAreaElement && currentSelected.innerText != undefined) {
              currentSelected.innerText = commandName
              return
            }

          }

          // console.log("find: " + commandName)
          currentSelected = find([commandName], (currentSelected && currentSelected.hasChildNodes()) ? currentSelected : document)

      }
    }
  }
  /*
        var btn = document.getElementById("searchBtn");
        var searchbar = document.getElementById("searchbar");
  
        if (btn && searchbar) {
          btn.addEventListener('click', () => searchbar.value ? onCommand(searchbar.value) : null)
        }
        */
});
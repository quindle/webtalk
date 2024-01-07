export class WebTalkLib {

  private scanAttributeName: string = 'aria-label'
  private className: string = 'webtalklib'
  private selectedClassName: string = 'webtalklib_selected'
  private currentSelected: HTMLElement | null = null
  private startElementId: string | null = null
  private startElement: HTMLElement | null = null
  private commands: Array<string> = new Array<string>()
  private systemCommands: Array<string> = ['clicca', 'esci']
  private language = window.navigator.language

  private recognition: any
  private grammar: any

  constructor(startElementId?: string | null, scanAttributeName?: string, language?: string) {

    this.startElementId = startElementId || this.startElementId
    this.scanAttributeName = scanAttributeName || this.scanAttributeName
    this.language = language || window.navigator.language
    this.configure()

  }

  configure(): void {

    this.startElement = this.startElementId ? document.getElementById(this.startElementId) || document.body : document.body
    this.scanDocument()

    // documentation of speech recognition in https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
    const SpeechRecognition = (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;
    const SpeechGrammarList = (<any>window).SpeechGrammarList || (<any>window).webkitSpeechGrammarList;

    this.recognition = new SpeechRecognition();
    this.grammar = new SpeechGrammarList();

    const systemCommandsGrammar = `#JSGF V1.0; grammar syscommands; public <syscommand> = ${this.systemCommands.join(
      " | ",
    )};`

    const commandsGrammar = `#JSGF V1.0; grammar commands; public <command> = ${this.commands.join(
      " | ",
    )};`

    this.grammar.addFromString(systemCommandsGrammar)
    this.grammar.addFromString(commandsGrammar)

    this.recognition.grammars = this.grammar;
    this.recognition.continuous = false;
    this.recognition.lang = this.language;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.startElement.addEventListener('click', () => this.startRecognition())

    this.recognition.addEventListener('result', (e: any) => this.onRecognitionResult(e))


    this.recognition.addEventListener('speechend', () => this.onRecognitionSpeechEnd());

    this.recognition.addEventListener('nomatch', () => this.onRecognitionNoMatch());

  }

  startRecognition(): void {

    if (this.recognition && !this.recognition.started) {

      console.log("startRecognition");
      this.recognition.start();
      this.recognition.started = true

    }

  }

  onRecognitionNoMatch(): void {
    console.log("I didn't recognize the command.");

  }

  onRecognitionResult(event: any): void {
    console.log("onRecognitionResult");
    const command: string = event.results[0][0].transcript;

    console.log(`Result received: ${command}.`);

    console.log(`Confidence: ${event.results[0][0].confidence}`);
    this.onCommand(command)
  }

  onRecognitionSpeechEnd() {
    console.log("onRecognitionSpeechEnd");
    this.recognition.stop();
    this.recognition.started = false


  }

  scanDocument(): void {

    this.commands = []
    document.querySelectorAll(`[${this.scanAttributeName}]`).forEach(c => {
      c.classList.add(this.className)
      let value: string | null = c.getAttribute(this.scanAttributeName)
      if (value) {
        this.commands.push(value)
      }

    })
  }

  removeSelection() {
    this.currentSelected = null
    document.querySelectorAll(`.${this.className}.${this.selectedClassName}`).forEach(el => el.classList.remove(this.selectedClassName))
  }

  onCommand(commandName: string) {

    if (commandName) {

      switch (commandName.toLowerCase()) {
        case this.systemCommands[1]:  //esci 
          this.removeSelection()
          break;
        case this.systemCommands[0]: //clicca
          this.currentSelected && this.currentSelected.click && this.currentSelected.click()
          break;

        default:

          if (this.currentSelected) {

            if (this.currentSelected instanceof HTMLInputElement && this.currentSelected.value != undefined) {
              this.currentSelected.value = commandName
              return
            } else if (this.currentSelected instanceof HTMLTextAreaElement && this.currentSelected.innerText != undefined) {
              this.currentSelected.innerText = commandName
              return
            }

          }

          // console.log("find: " + commandName)
          this.currentSelected = this.find([commandName], (this.currentSelected && this.currentSelected.hasChildNodes()) ? this.currentSelected : document)

      }
    }
  }

  find(values: string | Array<string>, parentElement: HTMLElement | Document): HTMLElement | null {

    var querySelector = this.getQuerySelector(values)

    // console.log(querySelector)

    let element: NodeListOf<HTMLElement> = parentElement.querySelectorAll(querySelector)

    if (element && element.length > 0) {

      this.removeSelection()

      let el = element[0]
      el.classList.add(this.selectedClassName)

      if (el instanceof HTMLButtonElement) {
        el.focus()
      } else {
        el.click()
      }

      return el

    } else if (parentElement != document) {
      return this.find(values, document)
    }
    return null
  }

  getQuerySelector(values: string | Array<string>): string {

    if (values instanceof Array) {
      var selectors = values.map(v => `[${this.scanAttributeName}=${v}]`)
      return selectors.join(",")
    }

    return `[${this.scanAttributeName}=${values}]`
  }
}
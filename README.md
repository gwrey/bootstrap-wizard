# [BootstrapWizard - v0.1](http://www.bootstrapwizard.com)

Responsive Bootstrap 3 Wizard

Designed as a clean wizard to be used in a Bootstrap Panel, a Modal, etc.

![Screenshot](screenshots/default.png)

## Usage

```html
<div class="wizard">
    <ul class="nav nav-wizard">
        <li>
            <a href="#step1">Step 1</a>
        </li>
        ...
    </ul>
            
    <div class="wizard-pane" id="step1">
        <h3>Step 1</h3>
        <form>
        ...
        </form>
    </div>
    ...
</div>
```

```javascript
$(".wizard").bootstrapWizard(options);
```

## Options
<table>
  <tr>
    <th>name</th><th>type</th><th>default</th><th>description</th>
  </tr>
  <tr>
    <td>width</td><td>numeric</td><td>null</td><td>width of the wizard</td>
  </tr>
  <tr>
    <td>height</td><td>numeric</td><td>300</td><td>height of wizard</td>
  </tr>
  <tr>
    <td>cancelButton</td><td>boolean</td><td>false</td><td>display the cancel button</td>
  </tr>
  <tr>
    <td>footerButtons</td><td>boolean</td><td>true</td><td>display the footer buttons</td>
  </tr>
  <tr>
    <td>progressBar</td><td>boolean</td><td>true</td><td>display the progress bar</td>
  </tr>
  <tr>
    <td>buttonText</td><td>object</td><td><pre>{
  cancel: "Cancel",
  next: "Next",
  back: "Back",
  submit: "Submit",
}</pre></td><td>text for the buttons</td>
  </tr>
</table>

## Methods
<table>
    <tr>
        <th>method</th><th>description</th>
    </tr>
    <tr>
        <td>markAllVisited</td><td>mark all nav items as visited</td>
    </tr>
    <tr>
        <td>serialize</td><td>serialize all the form data</td>
    </tr>
</table>

## Events
<table>
    <tr><th>event type</th><th>description</th></tr>
    <tr>
        <td>show.bw</td><td>fired when a nav is selected but has not yet been displayed</td>
    </tr>
    <tr>
        <td>submit.bw</td><td>fires when the submit button is clicked</td>
    </tr>
</table>

Inspired by Andrew Moffat's [Bootstrap Application Wizard](https://github.com/amoffat/bootstrap-application-wizard)

Sub step collapse credit to Osman Nuri Okumuş [MetisMenu](https://github.com/onokumus/metisMenu)

# BootstrapWizard - v0.1

Responsive Bootstrap 3 Wizard http://www.bootstrapwizard.com

![Screenshot](screenshots/default.png)

Designed as a clean wizard to be used in a Bootstrap Panel, a Modal, etc.

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
        ...
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


Inspired by Andrew Moffat's [Bootstrap Application Wizard](https://github.com/amoffat/bootstrap-application-wizard)

Sub step collapse credit to Osman Nuri Okumuş [MetisMenu](https://github.com/onokumus/metisMenu)

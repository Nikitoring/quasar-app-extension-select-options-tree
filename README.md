Quasar App Extension Select Options Tree
===

> Added option like tree in q-select

![select tree](https://user-images.githubusercontent.com/50715463/126863339-bc547ea1-87c0-4415-b85a-3f68561ec804.png)



# Install
```bash
quasar ext add select-options-tree
```
Quasar CLI will retrieve it from the NPM registry and install the extension to your project.

## Example Usage
 ```bash
 <select-tree
  :attributes="attributes"
  :setValue="setValue"
  :options="options
  :nodeKey="nodeKey"
 />

 ```
 ## Props Description
 1. options:
    - type": "Array",
    - Available options that the user can select from,
    - examples:
    ```bash
    [{label: 'American Cars', value: 'american' selected: false, children: [ {label:'Ford', value: 'ford', selected: false}, {label:'Tesla', value: 'tesla', selected: false}, {label:'General Motors', value: 'general', selected: false}]}]"
    ```
  2. attributes:
    - type": "Object",
    - All attributes Qselect (multiple is default)
  3. setValue:
    - type: "Function",
    - Emit for get model
  4. nodeKey:
    - type: "String",
    - Option key

# Uninstall
```bash
quasar ext remove select-options-tree
```

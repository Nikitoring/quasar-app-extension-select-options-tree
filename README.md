Quasar App Extension Select Options Tree
===

> Added option like tree in q-select

![optionsTree](https://user-images.githubusercontent.com/50715463/118376098-90abca00-b5ce-11eb-85cc-d878e7d34583.png)


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
    [{label: 'American Cars', children: [ {label:'Ford'}, {label:'Tesla'}, {label:'General Motors'}]}]"
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

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Joy516nX)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11274840&assignment_repo_type=AssignmentRepo)
# Jednoduchá master/detail aplikace v Reactu
Vytvořte aplikaci pomocí knihovny React a dalších prostředků která získá informace ze vzdáleného API a zobrazí je na dvou "stránkách", kde:

1. první stránka (např. List) zobrazí všechny zpracovávané položky s možností jejich filtrování (pokud API takovou možnost má)
2. druhá stránka (např. Detail) se zobrazí po kliknutí na libovolnou položku první stránky a zobrazí podrobnosti vybrané položky

V zadání byste si měli vyzkoušet:

1. vytvoření aplikace React přes [create-react-app](https://create-react-app.dev/), případná úprava .gitignore a .git tak, aby fungoval commit a push kódu bez nežádoucích souborů
2. rozdělení aplikace na komponenty
3. zkonfigurování [routování](https://reactrouter.com/en/main) se dvěma routami
4. udržování stavu komponent ve stavu přes hook [useState](https://react.dev/reference/react/useState)
5. získání dat z API přes [axios](https://axios-http.com/) nebo [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
6. získání dat po připojení komponenty přes [useEffect](https://react.dev/reference/react/useEffect)
7. nastylování aplikace přes [css moduly](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) nebo přes hotovou sadu vizuálních komponent
8. filtrování položek seznamu (na straně API) přes textový input

Zadání je tak zamýšlono spíše jako vytvoření prostoru pro studenty pro zopakování látky a prozkoumání nových možností, které React přináší.

## Zdroje informací

### [Seznam API](https://github.com/public-apis/public-apis)

Vyberte si API, které obsahuje všechny požadované vlastností: 

* seznam mnoha položek
* možnost tento seznam filtrovat (stačí například podle názvu položky)
* získání jen jedné položky

### Seznam knihoven UI komponent pro React

Použijte buď vlastní css moduly nebo si najděte svého favorita pro vytváření UI.

* [MUI](https://mui.com/)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [Reactstrap](https://github.com/reactstrap/reactstrap)
* [Ant design](https://ant.design/)
* [Chakra UI](https://chakra-ui.com/)
* [Grommet](https://v2.grommet.io/)
* [PrimeReact](https://primereact.org/)
* [Fluent](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)[UI](https://www.microsoft.com/design/fluent/)
* [Zen Desk](https://garden.zendesk.com/)
* [Blueprint](https://blueprintjs.com/)
* [visx](https://airbnb.io/visx/)
* [Semantic UI](https://react.semantic-ui.com/)
* [Next UI](https://nextui.org/)
* [Gestalt](https://gestalt.pinterest.systems/home)
* [Carbon UI System](https://carbondesignsystem.com/)

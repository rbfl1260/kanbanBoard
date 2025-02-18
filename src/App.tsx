import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "./atoms";
import { Board } from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  gap: 10px;
`;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
   font-family: 'Source Sans Pro', sans-serif;
   background-color: ${(props) => props.theme.bgColor};
   color:black;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

a{
  text-decoration: none;
  color: inherit;
}
*{
  box-sizing: border-box;
}`;

function App() {
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      //같은 board일 때
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setToDos((allBoards) => {
        //기존 보드에서 삭제
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        //목적지 보드에 삽입
        const targetBoard = [...allBoards[destination?.droppableId]];
        targetBoard.splice(destination?.index, 0, draggableId);
        return {
          //바뀐 기존 보드와 목적지 보드 업데이트
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
    // setToDos((allBoards) => {
    //   const copyToDos: IToDoState = {};
    //   Object.keys(allBoards).forEach((toDoskey) => {
    //     copyToDos[toDoskey] = [...allBoards[toDoskey]];
    //   });
    //   copyToDos[source.droppableId].splice(source.index, 1);
    //   copyToDos[destination.droppableId].splice(
    //     destination.index,
    //     0,
    //     draggableId
    //   );
    //   return copyToDos;
    // });
  };

  const [toDos, setToDos] = useRecoilState(toDoState);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(toDos).map((boardId) => (
                <Board
                  toDos={toDos[boardId]}
                  key={boardId}
                  boardId={boardId}
                ></Board>
              ))}
            </Boards>
          </Wrapper>
        </DragDropContext>
      </ThemeProvider>
    </>
  );
}

export default App;

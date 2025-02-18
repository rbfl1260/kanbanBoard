import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}
const Wrapper = styled.div`
  padding-top: 10px;
  display: flex;
  width: 300px;
  margin: 0 auto;
  flex-direction: column;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromWithThis: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromWithThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 15px;
`;

export function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => {
          console.log(provided);
          return (
            <Area
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromWithThis={Boolean(snapshot.draggingFromThisWith)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} toDo={toDo} index={index} />
              ))}
              {provided.placeholder}
            </Area>
          );
        }}
      </Droppable>
    </Wrapper>
  );
}

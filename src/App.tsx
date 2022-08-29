import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"

const listItems = [
	{
		id: "1",
		name: "Dhaanvi Farms"
	},
	{
		id: "2",
		name: "Sambrahma Farms"
	},
	{
		id: "3",
		name: "Abhivrudhi Farms"
	},
	{
		id: "4",
		name: "Eco-Habitat Farms"
	},
	{
		id: "5",
		name: "Bristlecone Farms"
	},
	{
		id: "6",
		name: "Aamrut Farms"
	},
	{
		id: "7",
		name: "Unnati Farms"
	}
]
console.log(listItems);

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	padding: 10,
	margin: `0 50px 15px 50px`,
	background: isDragging ? "#4a2975" : "white",
	color: isDragging ? "white" : "black",
	border: `1px solid black`,
	fontSize: `20px`,
	borderRadius: `5px`,

	...draggableStyle
})

function App() {
	const [ farms, setfarms ] = useState(listItems)

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) return

		const items = Array.from(farms)
		const [ newOrder ] = items.splice(source.index, 1)
		items.splice(destination.index, 0, newOrder)

		setfarms(items)
		//console.log(listItems);
		console.log(items);
	}
	
	return (
		<div className="App">
			<h1>Drag and Drop</h1>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="farms">
					{(provided) => (
						<div className="farms" {...provided.droppableProps} ref={provided.innerRef}>
							{farms.map(({ id, name }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
											>
												{name}
											</div>
										)}
									</Draggable>
								)
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}

export default App

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const handleChange = (e, setState) => {
    setState(e);
  };

  const handlerSubmit = async () => {
    if ((description && title) !== "") {
      let newTodoItems = [
        ...todoList,
        { title: title, description: description, status: false },
      ];
      setTodoList(newTodoItems);
      setTitle("");
      setDescription("");
      await AsyncStorage.setItem("List", JSON.stringify(newTodoItems));
    }
  };

  const DeleteTodoData = (item) => {
    const deleteTodo = todoList.filter((data, index) => index != item);
    setTodoList(deleteTodo);
  };

  const IsCompleted = (item) => {
    const doneTask = todoList.filter((data, index) => index != item?.index);
    let newTodoItems = [...doneTask];
    setTodoList(newTodoItems);
    let newCompletedList = [
      ...completedList,
      {
        description: item?.item?.description,
        title: item?.item?.title,
        status: !item?.item?.status,
      },
    ];
    setCompletedList(newCompletedList);
  };
  const SearchTitle = (e) => {
    const searchListValue = todoList.filter((data) => data?.title == e);
    setSearchList(...searchListValue);
  };
  console.log("Search List Value", searchList);
  const TodoData = (item) => {
    return (
      <>
        <View style={styles.detailContainer}>
          <View style={styles.leftContainer}>
            <Checkbox
              status={item?.item?.status ? "checked" : "unchecked"}
              onPress={() => {
                IsCompleted(item);
              }}
            />
            <View style={styles.detailTextStyle}>
              <Text>
                <Text style={styles.boldText}>Title: </Text>
                <Text style={styles.regularStyle}>{item?.item?.title}</Text>
              </Text>
              <Text>
                <Text style={styles.boldText}>Description: </Text>
                <Text style={styles.regularStyle}>
                  {item?.item?.description}
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => DeleteTodoData(item?.index)}>
            <AntDesign name="delete" size={24} color="#ff8e8e" />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const CompletedList = (item) => {
    return (
      <>
        <View style={styles.detailContainer}>
          <View style={styles.leftContainer}>
            <Checkbox status={item?.item?.status ? "checked" : "unchecked"} />
            <View style={styles.detailTextStyle}>
              <Text>
                <Text style={styles.boldText}>Title: </Text>
                <Text style={styles.regularStyle}>{item?.item?.title}</Text>
              </Text>
              <Text>
                <Text style={styles.boldText}>Description: </Text>
                <Text style={styles.regularStyle}>
                  {item?.item?.description}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headingStyle}>
          <Text style={styles.todoTextStyle}>TODO APP</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Title"
            onChangeText={(e) => handleChange(e, setTitle)}
            style={styles.regularStyle}
            value={title}
          />
          <TextInput
            placeholder="Enter Description"
            onChangeText={(e) => handleChange(e, setDescription)}
            style={styles.regularStyle}
            value={description}
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            onPress={handlerSubmit}
            style={styles.submitButtonStyle}
          >
            <Text style={styles.buttonStyles}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchConatiner}>
          <TextInput
            placeholder="Search Title"
            onChangeText={(e) => SearchTitle(e)}
            style={{ ...styles.regularStyle, width: "100%" }}
          />
        </View>

        {todoList.length != 0 ? (
          <>
            {searchList?.length != 0 ? (
              <>
                <Text style={{ ...styles.todoTextStyle, marginVertical: 10 }}>
                  Search LIST
                </Text>
                <FlatList
                  extraData={todoList}
                  renderItem={CompletedList}
                  data={searchList}
                />
              </>
            ) : (
              <>
                <Text style={{ ...styles.todoTextStyle, marginVertical: 10 }}>
                  TODO LIST
                </Text>
                <FlatList
                  extraData={todoList}
                  renderItem={TodoData}
                  data={todoList}
                />
              </>
            )}
          </>
        ) : null}

        {completedList.length != 0 ? (
          <>
            <Text style={{ ...styles.todoTextStyle, marginVertical: 10 }}>
              COMPLETED LIST
            </Text>
            <FlatList
              extraData={todoList}
              renderItem={CompletedList}
              data={completedList}
            />
          </>
        ) : null}
      </View>
    </>
  );
};

export default TodoList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  headingStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  todoTextStyle: { fontSize: 20, fontFamily: "montserrat-bold" },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#F6F7F9",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  submitContainer: {
    marginTop: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  submitButtonStyle: {
    borderWidth: 1,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#4C7EA8",
  },
  buttonStyles: { color: "#fff", fontFamily: "montserrat-medium" },
  searchConatiner: {
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#F6F7F9",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
    width: "100%",
  },
  detailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#F6F7F9",
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: { flexDirection: "row" },
  detailTextStyle: { marginLeft: 10 },
  regularStyle: { fontFamily: "montserrat-regular" },
  boldText: {
    fontFamily: "montserrat-bold",
  },
});

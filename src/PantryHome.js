import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Confetti from "react-confetti";
import {
  InsertInventoryFormDialog,
  EditInventoryFormDialog,
} from "./components/Inventory";
import {
  InsertWantedFormDialog,
  EditWantedFormDialog,
} from "./components/WantedInventory";
import useWindowSize from "react-use/lib/useWindowSize";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

/**
 * Creates homepage which lists inventory in a DataGrid format and allows volunteers and organizers to input inventory into the database
 * @returns Home page
 */
export default function PantryHome() {
  const [food_bank_name, setName] = useState("");
  const [insertOpen, setInsertOpen] = useState(false);
  const [editInventoryOpen, setInventoryEditOpen] = useState(false);
  const [insertWantedOpen, setInsertWantedOpen] = useState(false);
  const [editWantedOpen, setEditWantedOpen] = useState(false);
  let [editIndex, setEditIndex] = useState(0);
  let [item, setItem] = useState("");
  let [quantity, setQuantity] = useState(0);
  let [editId, setEditId] = useState(0);
  const [confettiOn, setConfettiOn] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [quantityList, setQuantityList] = useState([]);
  const [inventoryRows, setInventoryRows] = useState(() => []);
  const [id] = useState(inventoryRows.length + 1);
  const [wantedItemList, setWantedItemList] = useState([]);
  const [wantedQuantityList, setWantedQuantityList] = useState([]);
  const [wantedRows, setWantedRows] = useState(() => []);
  const { width, height } = useWindowSize();
  const [user, loading, error] = useAuthState(auth);

  const handleClickOpenInsert = () => setInsertOpen(true);
  const handleClickOpenWanted = () => setInsertWantedOpen(true);
  const handleClose = () => {
    setInsertOpen(false);
    setInsertWantedOpen(false);
    setInventoryEditOpen(false);
    setEditWantedOpen(false);
    setInsertWantedOpen(false);
    setItem("");
    setQuantity(0);
  };

  const deleteInventoryRowClick = (e, row, rows, index) => {
    const docRef = doc(db, "inventory", user?.uid);
    const deleteData = async () => {
      await updateDoc(docRef, {
        itemList: itemList.slice(0, index).concat(itemList.slice(index + 1)),
        quantityList: quantityList.slice(0, index).concat(quantityList.slice(index + 1)),
      });
    };
    deleteData();
  };

  const deleteWantedRowClick = (e, row, rows, index) => {
    const docRef = doc(db, "inventory", user?.uid ? user.uid : 0);
    const deleteData = async () => {
      await updateDoc(docRef, {
        wantedItemList: wantedItemList.slice(0, index).concat(wantedItemList.slice(index + 1)),
        wantedQuantityList: wantedQuantityList.slice(0, index).concat(wantedQuantityList.slice(index + 1)),
      });
    };
    deleteData();
  };

  const editInventoryRowClick = (e, index) => {
    setEditIndex(index);
    setEditId(inventoryRows[index].id);
    setItem(inventoryRows[index].col1);
    setQuantity(inventoryRows[index].col2);
    setInventoryEditOpen(true);
  };

  const editWantedRowClick = (e, index) => {
    setEditIndex(index);
    setEditId(wantedRows[index].id);
    setItem(wantedRows[index].col1);
    setQuantity(wantedRows[index].col2);
    setEditWantedOpen(true);
  };

  const columns = [
    {
      field: "col1",
      headerName: "Item",
      flex: 1,
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "bold",
    },
    {
      field: "col2",
      headerName: "Quantity",
      flex: 1,
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "bold",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      flex: 1,
      headerAlign: "center",
      headerClassName: "bold",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={(e) => editInventoryRowClick(e, inventoryRows.indexOf(params.row))}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={(e) => deleteInventoryRowClick(e, params.row, inventoryRows, inventoryRows.indexOf(params.row))}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const wantedColumns = [
    {
      field: "col1",
      headerName: "Item",
      flex: 1,
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "bold",
    },
    {
      field: "col2",
      headerName: "Quantity",
      flex: 1,
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "bold",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      flex: 1,
      headerAlign: "center",
      headerClassName: "bold",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={(e) => editWantedRowClick(e, wantedRows.indexOf(params.row))}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={(e) => deleteWantedRowClick(e, params.row, wantedRows, wantedRows.indexOf(params.row))}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    async function getInventoryData() {
      if (user) {
        onSnapshot(doc(db, "inventory", user?.uid ? user.uid : 0), (doc) => {
          if (doc.exists()) {
            setItemList(doc.data()["itemList"]);
            setWantedItemList(doc.data()["wantedItemList"]);
            setQuantityList(doc.data()["quantityList"]);
            setWantedQuantityList(doc.data()["wantedQuantityList"]);
          } else {
            console.log("Nothing!");
          }
        });
      }
    }
    getInventoryData();
  }, [user]);

  useEffect(() => {
    let tempRows = [];
    for (let i = 0; i < itemList.length; i += 1) {
      tempRows.push({
        id: i + 1,
        col1: itemList[i],
        col2: quantityList[i],
        align: "center",
      });
    }
    setInventoryRows(tempRows);
  }, [itemList, quantityList]);

  useEffect(() => {
    let tempRows = [];
    for (let i = 0; i < wantedItemList.length; i += 1) {
      tempRows.push({
        id: i + 1,
        col1: wantedItemList[i],
        col2: wantedQuantityList[i],
        align: "center",
      });
    }
    setWantedRows(tempRows);
  }, [wantedItemList, wantedQuantityList]);

  useEffect(() => {
    if (user) {
      const getName = async () => {
        const docRef = doc(db, "foodBank", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data()["name"]);
        } else {
          console.log("No such document!");
        }
      };
      getName();
    }
  }, [user]);

  return (
    <Container>
      <Box sx={{ marginTop: 2 }}>
        <confettiOn confettiOn={confettiOn} setConfettiOn={setConfettiOn} />
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome to {food_bank_name}'s Pantry!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Fab color="primary" aria-label="add" onClick={handleClickOpenInsert}>
            <AddIcon />
          </Fab>
          <Fab color="secondary" aria-label="add" sx={{ ml: 2 }} onClick={handleClickOpenWanted}>
            <AddIcon />
          </Fab>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Inventory
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={inventoryRows} columns={columns} pageSize={5} />
          </div>
        </Box>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Wanted Items
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={wantedRows} columns={wantedColumns} pageSize={5} />
          </div>
        </Box>
        <InsertInventoryFormDialog open={insertOpen} handleClose={handleClose} />
        <EditInventoryFormDialog
          open={editInventoryOpen}
          handleClose={handleClose}
          item={item}
          quantity={quantity}
          setItem={setItem}
          setQuantity={setQuantity}
          editId={editId}
        />
        <InsertWantedFormDialog open={insertWantedOpen} handleClose={handleClose} />
        <EditWantedFormDialog
          open={editWantedOpen}
          handleClose={handleClose}
          item={item}
          quantity={quantity}
          setItem={setItem}
          setQuantity={setQuantity}
          editId={editId}
        />
      </Box>
    </Container>
  );
}

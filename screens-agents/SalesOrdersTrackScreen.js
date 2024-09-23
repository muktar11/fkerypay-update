import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage if not already imported
import { API_ENDPOINT } from '@env';
const rowsPerPage = 16; // Number of rows per page

const SalesOrderTrackScreen = () => {


  const [tableState, setTableState] = useState({
       tableHead: ['no', 'id', 'supervisor','customer', 
    'Area', 'Route','LedgerBalance', 
    '0.35ml Qty', '0.35ml UP', '0.35ml Val', 
    '0.6ml Qty', '0.6ml UP', '0.6ml Val',
    '1L Qty', '1L UP', '1L Val',
    '2L Qty', '2L UP', '2L Val', 
    'Total Qty',  'Total Val',  'status', 'return_issue'], 
    /*  tableHead: ['ቁጥር', 'መታወቂያ ቁጥር', 'ተቆጣጣሪ','ደንበኛ', 
    'የገበያ አካባቢ', 'የሽያጭ መስመር','የሂሳብ መዝገብ', 
    '0.35 ሚሊ ሊትር ብዛት', '0.35 ሚሊ ሊትር አሃድ ዋጋ', '0.35 ሚሊ ሊትር ዋጋ', 
    '0.6 ሚሊ ሊትር ብዛት', '0.6 ሚሊ ሊትር አሃድ ዋጋ', '0.6 ሚሊ ሊትር ዋጋ',
    '1L ሚሊ ሊትር ብዛት', '1L ሚሊ ሊትር አሃድ ዋጋ', '1L ሚሊ ሊትር ዋጋ',
    '2L ሚሊ ሊትር ብዛት', '2L ሚሊ ሊትር አሃድ ዋጋ', '2L ሚሊ ሊትር ዋጋ',
    'ጠቅላላ ሚሊ ሊትር ብዛት', 'ጠቅላላ ሚሊ ሊትር ዋጋ',
    'ሁኔታ', 'የመመለሻ_ጉዳይ'],*/
  widthArr: [50, 50, 90, 150, 90, 90, 110, 90, 90, 90,
    90, 90, 90, 90, 90, 90, 90, 90, 90, 110, 110, 110],
  data: [],
  currentPage: 0, // Current page
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        const response = await fetch(`${API_ENDPOINT}/commerce/retrieve-remote-sales-order-view-by-supervisor/${id}/`);
        const data = await response.json();
        setTableState((prevState) => ({ ...prevState, data }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Empty array [] as the second argument to execute only on initial render



  const totalPages = () => Math.ceil(tableState.data.length / rowsPerPage);

  const changePage = (page) => {
    setTableState((prevState) => ({ ...prevState, currentPage: page }));
  };

  const calculateTotalWidth = () => tableState.widthArr.reduce((acc, width) => acc + width, 0);
`1  `
  const dataSlice = tableState.data.slice(
    tableState.currentPage * rowsPerPage,
    (tableState.currentPage + 1) * rowsPerPage
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={{ width: '100%' }}>
        <View>
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
            <Row data={tableState.tableHead} widthArr={tableState.widthArr} style={styles.head} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {dataSlice.map((item, index) => (
                <Row
                  key={index}
                  data={[
                    index + 1,
                    item._id,
                    item.supervisor,
                    item.customers_name,
                    item.sales_Route,
                    item.Route,
                    item.LedgerBalance,
                    item.Qp,
                    item.Q_Unit,
                    item.Q_CASH,
                    item.Hp,
                    item.H_Unit,
                    item.H_CASH,
                    item.ONEp,
                    item.ONE_Unit,
                    item.ONE_CASH,
                    item.TWOp,
                    item.TWO_Unit,
                    item.TWO_CASH,
           
                    item.Totalp,
                    item.Total_CASH,
                    item.status,
                    
                    // ... rest of the items
                  ]}
                  widthArr={tableState.widthArr}
                  style={
                    index % 1.6 === 0 // Change from index % 1.6 to index % 16 === 0 for every 16th row
                      ? { ...styles.row, backgroundColor: '#ffffff' }
                      : styles.row
                  }
                  
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Pagination controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => changePage(tableState.currentPage - 1)}
          disabled={tableState.currentPage === 0}
        >
          <Text style={styles.paginationButton}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>
          Page {tableState.currentPage + 1} of {totalPages()}
        </Text>
        <TouchableOpacity
          onPress={() => changePage(tableState.currentPage + 1)}
          disabled={tableState.currentPage === totalPages() - 1}
        >
          <Text style={styles.paginationButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SalesOrderTrackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  head: {
    height: 50,
    backgroundColor: '#87CEEB',
  },
  text: {
    textAlign: 'center',
    fontWeight: '200',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#87CEEB',
    color: 'white',
    borderRadius: 5,
  },
  pageText: {
    margin: 5,
    fontSize: 16,
  },
});

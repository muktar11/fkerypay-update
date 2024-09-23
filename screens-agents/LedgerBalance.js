import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { API_ENDPOINT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rowsPerPage = 16;

const LedgerBalanceScreen = () => {
  const [web_id, setWeb_id] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  
  const tableHead = [
    'number', 'date', 'Deposit amount', 'Deposit balance', 
    'approved',  'Bank Name', 'Branch name', 
    'narrative', 'bank reference number'
  ];
  
  const widthArr = [50, 90, 100, 150, 80, 100, 100, 100, 100, 100];

  useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
      const storedweb_id = await AsyncStorage.getItem('web_id');
      setWeb_id(storedweb_id);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/commerce/mobile-ledger-deposit-id/${web_id}/`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [web_id]); // Fetch data when web_id changes

  const totalPages = () => Math.ceil(data.length / rowsPerPage);
  const changePage = (page) => {
    if (page >= 0 && page < totalPages()) {
      setCurrentPage(page);
    }
  };
  
  const dataSlice = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <View>
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
            <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {dataSlice.map((item, index) => (
                <Row
                  key={index}
                  data={[
                    item._id,
                    item.Deposit_Date,
                    item.Deposit_Amount,
                    item.Balance,
                    item.finance_approved ? "Yes" : "No",
                    item.Bank_Name,
                    item.Branch_Name,
                    item.Narrative,
                    item.Bank_Reference_Number,
                  ]}
                  widthArr={widthArr}
                  style={[styles.row, index % 2 && { backgroundColor: '#F7F8FA' }]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={() => changePage(currentPage - 1)} disabled={currentPage === 0}>
          <Text style={styles.paginationButton}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>Page {currentPage + 1} of {totalPages()}</Text>
        <TouchableOpacity onPress={() => changePage(currentPage + 1)} disabled={currentPage === totalPages() - 1}>
          <Text style={styles.paginationButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LedgerBalanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    width: '100%', // Adjust this to fill the container
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


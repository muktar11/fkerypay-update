import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { API_ENDPOINT } from '@env';
const rowsPerPage = 16; // Number of rows per page

export default class SalesOrderReturnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

     tableHead: ['no', 'id', 'supervisor','customer', 
    'Area', 'Route','LedgerBalance', 
    '0.35ml Qty', '0.35ml UP', '0.35ml Val', 
    '0.6ml Qty', '0.6ml UP', '0.6ml Val',
    '1L Qty', '1L UP', '1L Val',
    '2L Qty', '2L UP', '2L Val', 
    'Total Qty',  'Total Val',  'status', 'return_issue'], 
     /*() tableHead: ['ቁጥር', 'መታወቂያ ቁጥር', 'ተቆጣጣሪ','ደንበኛ', 
    'የገበያ አካባቢ', 'የሽያጭ መስመር','የሂሳብ መዝገብ', 
    '0.35 ሚሊ ሊትር ብዛት', '0.35 ሚሊ ሊትር አሃድ ዋጋ', '0.35 ሚሊ ሊትር ዋጋ', 
    '0.6 ሚሊ ሊትር ብዛት', '0.6 ሚሊ ሊትር አሃድ ዋጋ', '0.6 ሚሊ ሊትር ዋጋ',
    '1L ሚሊ ሊትር ብዛት', '1L ሚሊ ሊትር አሃድ ዋጋ', '1L ሚሊ ሊትር ዋጋ',
    '2L ሚሊ ሊትር ብዛት', '2L ሚሊ ሊትር አሃድ ዋጋ', '2L ሚሊ ሊትር ዋጋ',
    'ጠቅላላ ሚሊ ሊትር ብዛት', 'ጠቅላላ ሚሊ ሊትር ዋጋ',
    'ሁኔታ', 'የመመለሻ_ጉዳይ'],*/
      widthArr: [50, 50, 90, 150, 
        90, 90,  110, 
        90, 90, 90,
        90, 90, 90,
        90, 90, 90,
        90, 90, 90, 
        110, 110, 110, 200],
      data: [],
      currentPage: 0, // Current page
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/commerce/rejected-remote-sales-order-view`);
      const data = await response.json();

      this.setState({ data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Calculate the number of pages
  totalPages = () => Math.ceil(this.state.data.length / rowsPerPage);

  // Update the current page
  changePage = (page) => {
    this.setState({ currentPage: page });
  };

  calculateTotalWidth = () => state.widthArr.reduce((acc, width) => acc + width, 0);
  render() {
    const state = this.state;

    // Slice the data based on the current page
    const dataSlice = state.data.slice(
      state.currentPage * rowsPerPage,
      (state.currentPage + 1) * rowsPerPage
    );

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} style={{ width: '100%' }}>
          <View>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text} />
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
                      item.cso_remote_process_return_issue,
                    ]}
                    widthArr={state.widthArr}
                    style={[styles.row, index % 1.6 && { backgroundColor: '#ffffff' }]}
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
            onPress={() => this.changePage(state.currentPage - 1)}
            disabled={state.currentPage === 0}
          >
            <Text style={styles.paginationButton}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>
            Page {state.currentPage + 1} of {this.totalPages()}
          </Text>
          <TouchableOpacity
            onPress={() => this.changePage(state.currentPage + 1)}
            disabled={state.currentPage === this.totalPages() - 1}
          >
            <Text style={styles.paginationButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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

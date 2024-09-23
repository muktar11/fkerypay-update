import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { API_ENDPOINT } from '@env';
const rowsPerPage = 16; // Number of rows per page
import { useTranslation } from 'react-i18next';

export default class ReturnDepositScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ቁጥር', 'ቀን', 'የገንዘብ መጠን','የCSI CSRI ቁጥር',
       "የባንክ ስም" ,
        'የቅርንጫፍ ስም', 'አስገቢ ስም', 'የባንክ ማመሳከሪያ ቁጥር', 
        'የሂሳብ መዝገብ', 'ጸድቋል', 'ተመለሰ', 'መመለሻ_ጉዳይ'],
        /*ableHead: ['No', 'Date', 'Amount','CSI/CSRI', 'Bank Name', 
        'Branch Name','Narrative', 'Bank Refence Number', 
        'Balance', 'Approved', 'Returned', 'return_issue'], */
      widthArr: [90, 90, 90, 150, 150, 150,  150, 150, 150, 150, 150, 150, 150,  90, 90, 250,],
      data: [],
      currentPage: 0, // Current page
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/commerce/return-mobile-ledger-deposit-approve-view`);
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
        <ScrollView horizontal={true} style={{ width: 770 }}>
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
                      item.Deposit_Date,
                      item.Deposit_Amount,
                      item.CSI_CSRI_Number,
                      item.Bank_Name,
                      item.Branch_Name,
                      item.Narrative,
                      item.Bank_Reference_Number,
                      item.Balance,
                    
                      item.finance_approved ? 'Yes' : 'No',
                      item.finance_returned ? 'Yes' : 'No',
                      item.return_issue,
                    ]}
                    widthArr={state.widthArr}
                    style={[styles.row, index % 1 && { backgroundColor: '#ffffff' }]}
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

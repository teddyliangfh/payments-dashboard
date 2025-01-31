"use client"
import { Box } from '@chakra-ui/react';
import { SetPaymentDay } from '../components/setPaymentDay';
import { paymentPlanData } from "@/mock/paymentPlan"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const handleSuccess = () => {
    //todo: refetch the payment plan data from BE
  };

  return (
    <Box minH="100vh" p={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={16}>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" bg="lightblue" w="full" py={5} px={6}>
        <SetPaymentDay paymentPlan={paymentPlanData} onUpdateSuccess={handleSuccess} />
        <Toaster />
      </Box>
    </Box>
  );
}
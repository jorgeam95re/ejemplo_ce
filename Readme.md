# MC - Solo 1 Cuadro

```
Sub Enviar_Correo_Desde_Excel()
    Dim OutlookApp As Object
    Dim OutlookMail As Object
    Dim rangoDatos As Range
    Dim cuerpoCorreo As String
    Dim destinatario As String
    Dim asunto As String

    Dim datos As String
    Dim mensaje As String
    
    Set OutlookApp = CreateObject("Outlook.Application")
    Set OutlookMail = OutlookApp.CreateItem(0)
    datos = ThisWorkbook.Sheets("Correo").Range("B2").Value
    mensaje = ThisWorkbook.Sheets("Correo").Range("B4").Value
    
    destinatario = "correo@destinatario.com"
    asunto = datos
    
    Set rangoDatos = ThisWorkbook.Sheets("Correo").Range("B6:C11")
    
    cuerpoCorreo = "<p>" & mensaje & "</p>" & RangoaTextoHTML(rangoDatos, datos)

    With OutlookMail
        .To = destinatario
        .Subject = asunto
        .HTMLBody = cuerpoCorreo
        .Display
    End With
    
    Set OutlookMail = Nothing
    Set OutlookApp = Nothing
End Sub

Function RangoaTextoHTML(rango As Range, datos As String) As String
    Dim textoHTML As String
    Dim fila As Range
    Dim celda As Range
    Dim numColumnas As Integer
    Dim esPrimeraFila As Boolean

    Dim datoCuadro() As String
    Dim cont As Integer
    cont = 0
    
    datoCuadro = Split(datos, "//")
    
    numColumnas = rango.Columns.Count
    
    textoHTML = "<table border='1' style='border-collapse:collapse;'>"
    esPrimeraFila = True
    
    For Each fila In rango.Rows
        textoHTML = textoHTML & "<tr>"
        
        If esPrimeraFila Then
            textoHTML = textoHTML & "<td colspan='" & numColumnas & "' style='text-align:center;background:#FFFF00;'>" & _
               "<!--[if mso]>" & _
               "<span style='font-size:13pt;font-family:Arial;font-weight:bold;color:#000000;'>" & "SOLICITUD DE TAREA" & "</span>" & _
               "<!--[if mso]>" & _
               "</center></v:textbox></v:rect>" & _
               "<![endif]-->" & _
               "</td>"
            esPrimeraFila = False
        Else
            textoHTML = textoHTML & "<td style='width:120px;text-align:center;background:#FFFF00;'>" & _
            " <span style='font-size:10pt;font-family:Arial;font-weight:bold;color:#000000;'> " & fila.Cells(1, 1) & " </sapn></td>"
            
            If fila.Cells(1, 1) = "PRIORIDAD" Then
                textoHTML = textoHTML & "<td style='height:20px;width:290px; text-align:center;'>" & fila.Cells(1, 2) & "</td>"
            Else
                textoHTML = textoHTML & "<td style='width:290px; text-align:center;'>" & datoCuadro(cont) & "</td>"
            End If
            cont = cont + 1
        End If
        
        textoHTML = textoHTML & "</tr>"
    Next fila
    
    textoHTML = textoHTML & "</table>"
    RangoaTextoHTML = textoHTML
End Function
```

# MC - Multiples Cuadros
```
Sub Enviar_Correo_Desde_Excel()
    Dim OutlookApp As Object
    Dim OutlookMail As Object
    Dim rangoDatos As Range
    Dim cuerpoCorreo As String
    Dim destinatario As String
    
    Dim tareas As Range
    
    Set OutlookApp = CreateObject("Outlook.Application")
    Set OutlookMail = OutlookApp.CreateItem(0)
    
    destinatario = "correo@destinatario.com"
    
    Dim prioridad As String
    prioridad = Sheets("Correo - Corte Pro").Cells(2, 3).Value
    
    Set tareas = Range("B5", Range("B5").End(xlDown))
    
    ' cuerpoCorreo = RangoaTextoHTML(rangoDatos, datos)

    cuerpoCorreo = cuerpoCorreo + "<br>"
    For Each tarea In tareas.Rows
        cuerpoCorreo = cuerpoCorreo & RangoaTextoHTML(tarea.Value, prioridad) & "<br>"
    Next tarea

    With OutlookMail
        .To = destinatario
        .Subject = "Tareas para corte programado"
        .HTMLBody = cuerpoCorreo
        .Display
    End With
    
    Set OutlookMail = Nothing
    Set OutlookApp = Nothing
End Sub

Function RangoaTextoHTML(datos As String, prioridad As String) As String
    Dim textoHTML As String

    Dim datoCuadro() As String
    datoCuadro = Split(datos, "//")
    
    Dim cont As Integer
    cont = 0
    
    Dim ListaDatos As Collection
    Set ListaDatos = New Collection
    ListaDatos.Add "NOMBRE"
    ListaDatos.Add "TRABAJO"
    ListaDatos.Add "PRIORIDAD"
    ListaDatos.Add "SUPERVISOR"
    ListaDatos.Add "FALLA"
    
    textoHTML = "<table border='1' style='border-collapse:collapse;'>"
    
    textoHTML = textoHTML & "<tr>"
    textoHTML = textoHTML & "<td colspan='2' style='text-align:center;background:#FFFF00;'>" & _
    "<!--[if mso]>" & _
    "<span style='font-size:13pt;font-family:Arial;font-weight:bold;color:#000000;'>" & "SOLICITUD DE TAREA" & "</span>" & _
    "<!--[if mso]>" & _
    "</center></v:textbox></v:rect>" & _
    "<![endif]-->" & _
    "</td>"
    
    For Each Item In ListaDatos
            textoHTML = textoHTML & "<tr> <td style='width:120px;text-align:center;background:#FFFF00;'>" & _
            " <span style='font-size:10pt;font-family:Arial;font-weight:bold;color:#000000;'> " & Item & " </sapn></td>"
            
            If Item = "PRIORIDAD" Then
                textoHTML = textoHTML & "<td style='height:20px;width:290px; text-align:center;'>" & prioridad & "</td>"
            Else
                textoHTML = textoHTML & "<td style='width:290px; text-align:center;'>" & datoCuadro(cont) & "</td>"
            End If
        
        textoHTML = textoHTML & "</tr>"
        cont = cont + 1
    Next Item
    
    textoHTML = textoHTML & "</table>"
    RangoaTextoHTML = textoHTML
End Function
```
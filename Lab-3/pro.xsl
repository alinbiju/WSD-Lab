<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html lang="en">
            <head>

            </head>
            <body>
                <h1>Users</h1>
                <table>
                    <tr bgcolor="#e3e3e3">
                        <th>userid</th>
                        <th>username</th>
                        <th>password</th>
                        <th>name</th>
                        <th>email</th>
                        <th>age</th>
                    </tr>
                    <xsl:for-each select="users/user">
                        <!-- <xsl:sort select="userid"> -->
                            <xsl:if test="age&lt;100">
                                <tr>
                                    <td>
                                        <xsl:value-of select="userid" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="username" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="password" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="name" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="email" />
                                    </td>
                                    <xsl:choose>
                                        <xsl:when test="age > 30 ">
                                            <td style="background-color: rgb(250, 250, 188);">
                                                <xsl:value-of  select="age" />
                                            </td>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <td style="background-color: rgb(188, 250, 212);">
                                                <xsl:value-of select="age" />
                                            </td>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </tr>
                            </xsl:if>
                        <!-- </xsl:sort> -->
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>